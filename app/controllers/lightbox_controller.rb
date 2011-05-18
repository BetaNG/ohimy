# encoding: utf-8
class LightboxController < ApplicationController
  layout 'lightbox'
  before_filter :only_post
  skip_before_filter :verify_authenticity_token
  caches_page :face, :goods, :shop, :pic
  def index

  end

  def face

  end

  def goods

  end

  def shop

  end

  def pic

  end

  private

  def only_post
    redirect_to root_path unless request.post?
  end

end
