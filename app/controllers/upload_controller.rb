# encoding: utf-8
class UploadController < ApplicationController
  layout 'welcome'
  def upload_avatar;end

  # => 头像上传
  def avatar
    @avatar = current_user.avatars.create(params[:avatar])
    redirect_to root_path
  end

end
