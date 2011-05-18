# encoding: utf-8
class Avatar
  include Mongoid::Document
  include Mongoid::Paperclip
  embedded_in :user, :inverse_of => :avatars

  has_mongoid_attached_file :avatar,
    :styles => {:s => '22x22', :m => '48x48!', :l =>'100x100'},
    :whiny => false

  validates_attachment_size :avatar, :less_than => 2.megabyte
  validates_attachment_presence :avatar
  validates_attachment_content_type :avatar, :content_type => ['image/jpeg','image/jpg', 'image/png','image/gif'], :message => "只能上传图片文件"
end
