require 'digest/md5'
require 'net/http'

# OpenTaobao
module OpenTaobao               
  
  @raw_taobao_configuration = {}  #淘宝API各项参数
  @taobao_configuration = {}  #top参数
  
  class << self
    def load_configuration(taobao_yaml_file)
      if File.exist?(taobao_yaml_file)
        @raw_taobao_configuration = YAML.load(ERB.new(File.read(taobao_yaml_file)).result)
        @raw_taobao_configuration = @raw_taobao_configuration[Rails.env] if  Rails.env

        apply_configuration(@raw_taobao_configuration)
      end
    end
    
    def apply_configuration(config)
      ENV['TAOBAO_API_KEY']   = config['api_key'].to_s
      ENV['TAOBAO_SECRET_KEY']   = config['secret_key']

      @taobao_configuration = config
    end 
    
    def generate_uri()
      case @taobao_configuration['host']
      when 'sandbox'  #沙箱环境地址
        uri = 'http://gw.api.tbsandbox.com/router/rest'
      when 'prod' #正式环境地址
        uri = 'http://gw.api.taobao.com/router/rest'
      end
      URI.parse uri   #生成URI
    end

    #发送拼装的参数
    def post_with(joined_params = {})
      pra = pasted_params(joined_params)
      parse_result Net::HTTP.post_form(generate_uri, pra).body
    end
    
    def pasted_params(joined_params)
      prams= {
        'app_key' => @taobao_configuration['app_key'],
        'format' => @taobao_configuration['format'],
        'v' => '2.0',
        'timestamp' => Time.now.strftime("%Y-%m-%d %H:%M:%S"),
        'sign_method' => 'md5'
      }
      prams.reverse_merge!(joined_params) #合并参数
      #生成sign
      prams['sign'] = Digest::MD5.hexdigest(@taobao_configuration['secret_key'] + prams.sort.flatten.join + @taobao_configuration['secret_key']).upcase
      prams
    end

    def parse_result(result)
      case @taobao_configuration['format']
      when 'xml'  
        Crack::XML.parse(result)['rsp'] || Crack::XML.parse(result)['error_rsp']
      when 'json'
        Crack::JSON.parse(result)
      end
    end
    
  end     

end