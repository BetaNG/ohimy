class AdminController < ApplicationController
  layout 'admin'
  before_filter {redirect_to root_path unless current_user[:role] == 88}
end
