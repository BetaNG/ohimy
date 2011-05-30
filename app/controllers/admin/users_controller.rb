# encoding: utf-8
class Admin::UsersController < AdminController
  def index
    @users = User.where(:role => 0)
  end

  def edit
    @user = User.find params[:id]
  end

  def new
    @user = User.new
  end

  def create
    params[:user][:name].split(',').each_with_index do |nick,index|
      params[:user][:name] = nick
      params[:user][:email] = "robot#{DateTime.now.to_i}#{index}@ohimy.com"
      params[:user][:sex] = ['男','女','秘密'][rand(3)]
      params[:user][:birthday] = Date.new(1970+rand(30),rand(12)+1,rand(28)+1)

      params[:user][:created_at] = Date.today - rand(300).day
      
      @user = User.create(params[:user])
    end
    redirect_to :action=>'index'
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      redirect_to admin_user_path @user
    else
      render :action => "show"
    end
  end
end
