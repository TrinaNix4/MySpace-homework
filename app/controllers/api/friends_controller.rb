class Api::FriendsController < ApplicationController
  #devise token auth here
  #authenticate_user! is a devise token gem method
  #exceoption of api/everyone, anyone can go there even if not signed in 
  before_action :authenticate_user!, except: [:everyone]

  #no checking for token 
  #no current_user since we don't check token 
  def everyone
    render json: "Everyone can see this"
  end
#check token, if valid - set current user; if not valid, 401 error 
#grab the info of one specific user-the logged in user or current_user
  def index
    #grab the 'current_user' (the user who sent a valid token)
    #the back end set the variable called current_user for us
    liked_friends_ids = current_user.liked_friends
    #passing the liked_friends array an array of numbers 
    render json: User.unliked_friends(liked_friends_ids)
  end

  def my_friends
    #grab the 'current_user' (the user who sent a valid token)
    #the back end set the variable called current_user for us
    liked_friends_ids = current_user.liked_friends
    #passing the liked_friends array an array of numbers 
    render json: User.liked(liked_friends_ids)
  end
#checks token
#if token valid, set current_user
#if not valid 401 error 
#update method will get called when user likes a friend  
def update
    #pushing the id from params to the liked_friends array 
    current_user.liked_friends.push(params[:id].to_i)
    #update user to DB 
    current_user.save
  end
end
