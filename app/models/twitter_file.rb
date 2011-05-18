class TwitterFile
  include Mongoid::Document
  
  referenced_in :product
  referenced_in :attachment
  embedded_in :twitter
end
