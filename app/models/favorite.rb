class Favorite
  include Mongoid::Document
  
  validates_uniqueness_of :favoritable_id, :scope => :user_id
  
  belongs_to :user
  belongs_to :favoritable, polymorphic: true
end
