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
# because it's quick and easy; 
#take an array convert it to text and store text in the db; 
# then when we pull it out, we can convert back into an array
  serialize :liked_friends, Array

  #grab all unliked friends
#ids is a list of users 'liked' friends 
#taking ids of current users liked cats and then
#look in db and find all the ids that aren't in that list of liked cats
def self. unliked_friends(ids)
    ids = ids.empty? ? [0] : ids 
    Friend.where("id NOT IN (?)", ids).order("RANDOM()")
end

#grabs all liked friends
#ids is a list of users 'liked' friends
#give it the array of ids, and it will give us back all of 
#those cats; (user doesn't have many cats, no association so just keeping track of ids in an array)
def self.liked(ids)
  ids = ids.empty? ? [0] : ids
  Friend.where("id IN (?)", ids)
end 


 
end
