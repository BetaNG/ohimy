require 'open_taobao'
require 'taobao'

taobao_config_file = File.expand_path('../../../config/taobao.yml', __FILE__)
TAOBAO = OpenTaobao.load_configuration(taobao_config_file)