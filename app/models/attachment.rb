# encoding: utf-8
class Attachment
  include Mongoid::Document
  include Mongoid::Paperclip
  
  has_mongoid_attached_file :attachment, :styles => {:small => '100x100', :medium => '160x160', :big => '468x468'}, :whiny => false
  validates_attachment_size :attachment, :less_than => 2.megabyte
  validates_attachment_presence :attachment
  validates_attachment_content_type :attachment, :content_type => ['image/jpeg','image/jpg', 'image/png','image/gif'], :message => "只能上传图片文件"
end
