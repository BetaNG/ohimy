class HomeController < ApplicationController
  
  # => 用户已经登录
  def index
    redirect_to "/welcome" unless user_signed_in?
  end
  
  # => 用户没有登录
  def welcome
    render :layout => "welcome"
  end
  
  # => 管理界面
  def admin
    redirect_to root_path unless current_user[:role] == 88
    render :template=>'admin/index',:layout=>'admin'
  end
  
end
