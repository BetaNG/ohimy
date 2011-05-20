# encoding: utf-8
class GallController < ApplicationController
  before_filter :authenticate_user!
  before_filter :only_post, :only => [:get_item_from_url,:to_forward]
  before_filter :load_twitter, :only => [:comment,:to_forward]
  def index
    @twitters = Twitter.find(:all,:sort=>['_id', :desc]).paginate(page: 1, per_page: 2)
  end

  # => 发表
  def create
    @twitter = current_user.twitters.create(:content=>params[:content])
    unless params[:num_iids].nil?
      # => 跌代num_iids
      params[:num_iids].each do |iid|
        @twitter.twitter_files.create(:product => Product.where('num_iid' => iid.to_i).first)
      end
    end
    unless params[:pic_ids].nil?
      # => 跌代pic_ids
      params[:pic_ids].each do |pid|
        @twitter.twitter_files.create(:attachment => Attachment.find(pid))
      end
    end
    render :partial => 'twitter'
  end

  def comment
    @comment = @twitter.comments.create(:user=>current_user, :content=>params[:content])
    render :partial => "comment"
  end

  def get_item_from_url
    env = Rack::MockRequest.env_for(params[:url])
    req = Rack::Request.new(env)
    pa = req.params
    num_iid = pa['default_item_id'] || pa['id']
    @iid = num_iid.to_i   # => 将num_iid转换为数字

    # => 当本地没有缓存时
    if (Product.where('num_iid' => @iid).first).nil?
      item = Taobao.item_get('num_iid' => num_iid)
    @item = Product.create item
    # => 当本地数据库有缓存时
    else
      @item = Product.where('num_iid' => @iid).first
    end

    case params[:tplt]
    when "lb" then render :partial => "get_item_from_url_lb"
    when "pub" then render :partial => "get_item_from_url_pub"
    end

  end

  def addpic
    @attachment = Attachment.create(params[:attachment])
    if params[:pub_pic]
      render :partial => 'pub_pic'
    else
      render :layout => false
    end
  end
  
  def to_forward
    if @twitter.twitter
      @forward = @twitter.twitter
      @content = "//@#{@twitter.user.name} #{@twitter[:content]}"
    else
      @forward = @twitter
      @content = ""
    end
    render :layout => false
  end
  
  def forward
    twitter = Twitter.find(params[:id])
    forward = Twitter.find(params[:referenced])
    twitter.update_attribute(:ftimes,twitter[:ftimes]+1)
    @twitter = forward.forwards.create(:content=>params[:content],:user=>current_user)
    render :partial => 'twitter'
  end

  private

  def only_post
    redirect_to root_path unless request.post?
  end
  
  def load_twitter
    @twitter = Twitter.find(params[:id])
  end
end
