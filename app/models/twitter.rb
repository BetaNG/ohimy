# encoding: utf-8
class Twitter
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :content
  field :ftimes, type: Integer, default: 0
  
  embeds_many :twitter_files
  referenced_in :user
  references_many :forwards, :class_name => "Twitter",:inverse_of => :twitter
  referenced_in :twitter
  has_many :comments, as: :commentable
  
end
