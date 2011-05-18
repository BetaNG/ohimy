class Admin::UsersController < AdminController
  def index
    @users = User.all
  end
  
   def edit
    @user = User.find params[:id]
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
