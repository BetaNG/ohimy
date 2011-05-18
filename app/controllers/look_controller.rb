class LookController < ApplicationController
  before_filter :authenticate_user!
end
