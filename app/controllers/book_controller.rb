class BookController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @books = Twitter.where(:twitter_files.exists => true).limit(20)
  end
  
  def show
    @books = Twitter.find(:all,:sort=>['_id', :desc])
  end
end
