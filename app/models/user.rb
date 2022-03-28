# frozen_string_literal: true

class User < ActiveRecord::Base
    extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
# serializing our liked_friends column makes it an Array
#arrays can't be stored in a database but we want to treat it like an array
#within our app 
# we use this serialized array to store all the liked friends ids
# because it's quick and easy 
  serialize :liked_friends, Array

  def self.random_friend(ids)
    ids = ids.empty? ? [0] : ids 
    
    Friend.where("id NOT IN (?)", ids).order("RANDOM()")
end
def self.liked(ids)
  ids = ids.empty? ? [0] : ids
  Friend.where("id IN (?)", ids)
end 

end
