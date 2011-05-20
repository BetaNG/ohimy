# encoding: utf-8
class User
  include Mongoid::Document
  include Mongoid::Timestamps
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  embeds_many :avatars
  references_many :twitters
  references_many :comments
  
  field :name
  field :email
  field :sex, default: ""
  field :birthday, type: Date
  field :credit, type: Integer
  field :buyer, type: Boolean, default: false
  field :taobaoid
  field :role, type: Integer, default: 0
  
  
  validates_presence_of :name, :email
  validates_uniqueness_of :name, :case_sensitive => false
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me

end
