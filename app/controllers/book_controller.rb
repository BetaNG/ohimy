# encoding: utf-8
class BookController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @books = Twitter.where(:twitter_files.exists => true).limit(20)
  end
  
  def show
    @user = User.find(params[:id])
    @books = @user.twitters.limit(20)
  end
end
