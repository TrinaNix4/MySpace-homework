Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

namespace :api do
  get 'everyone', to: 'friends#everyone'
  get 'my_friends', to: 'friends#my_friends'
    resources :friends, only: [:index, :update]
end 
#creating routes for index method and update on our friends 



end
