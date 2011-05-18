class Product
  include Mongoid::Document
  
  field :num_iid
  field :title
  field :nick
  field :pic_url
  field :price
end
