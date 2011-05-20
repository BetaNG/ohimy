class Comment
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :content
  
  referenced_in :user
  belongs_to :commentable, polymorphic: true
end
