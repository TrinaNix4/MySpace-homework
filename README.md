# Clone 
1. in terminal, git clone "copy and paste the repository link from github"
2. cd into the project you just cloned

# rails stuff
1. rename our database in the database.yml file 
2. bundle 
3. rails db:create db:migrate db:seed 
4. rails s -p 3001

#react stuff
- make sure you're in the client folder 
1. yarn
2. yarn start

#git stuff
1. git remote rm origin
2. create new repo on github
3. git remote add origin 


## Features/Explanation
## TOKENS
- token based auth
1. when client log in server will check our creds and if valid gives us back a token (via response)
2. when client make subsequent requests, needs to send token, if token is invalid server will responded 401 error. (unauthed)

how do we do handle receiving token and sending token (backend): devise_token_auth: sending in response (frontend): devise-axios library (in index.js)
```
import { initMiddleware } from 'devise-axios';

// this going to get token from api calls and set them to be sent on the
// next api call, also stores info to localStorage,
initMiddleware();

```
## AuthProvider

gives a way to share this 'user' state( where user is authed user) and methods to login, logout, register.

```
    <AuthProvider>
      <App />
    </AuthProvider>
    ```
## App.js

```
      <FetchUser>
        <>
          <Routes>
            {/* Unprotected */}
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/' element={<Home />}/>
           
                {/* protected in routes inside of here you need to logged in*/}
                {/* else you go to login page*/}
            <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<HomeClass yo={'yoyo'} />}/>
            </Route>  
            <Route path='*' element={<NoMatch />}/>
          </Routes>
        </>
      </FetchUser>

      ```
## Three parts here

1. FetchUser: Checks to see if there is a valid user, and prevent Routes from getting render until the check is done

if fetchUser is in progress of Checking it looks like this
```
      <FetchUser>
        {null}
      </FetchUser>
      ```
2. Unprotected routes routes you don't need to be logged in to see..
   ```
   
   {/* Unprotected */}
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/' element={<Home />}/>

            ```
3. Protected routes routes you do need to be logged in to see..

```
    <Route element={<ProtectedRoute />}>
        {/* Any Routes we throw in here, user needs to be logged in */}
        <Route path='/home' element={<HomeClass yo={'yoyo'} />}/>
    </Route>  
   ``` 
  ```  
    const ProtectedRoute = (props)=>{
        // get user from Provider 
        const auth = useContext(AuthContext)
        // if we have auth.user render the route
        // if not we can do something else, in this
        // case we redirect to Login screen
        return auth.user ? <Outlet /> : <Navigate to='/login'/>
    }
    ```
## Backend
1. add devise_token_auth to gem file
2. rails g devise_token_auth:install User api/auth this command does a lot for us
- it adds the routes/controller stuff
- it create our model (in this case the user model)
3. add extend Devise::Models to user.rb file
4. added AddTrackableToUsers migration

```ruby

class AddTrackableToUsers < ActiveRecord::Migration[6.0]
  def change
      ## Trackable
      add_column :users, :sign_in_count, :integer, :default => 0
      add_column :users, :current_sign_in_at, :datetime
      add_column :users, :last_sign_in_at, :datetime
      add_column :users, :current_sign_in_ip, :string
      add_column :users, :last_sign_in_ip, :string
  end
end

```

## routes
we have all the routes defined and controller action setup for us...
 
 ```
Rails.application.routes.draw do
  # generates all devise routes
  # and controller actions are all setup for us 
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end

```
## main features on backend
way to protect routes on the backend before_action :authenticate_user1 
- if auth is successful then we have 
current user 

way to get logged-in-'user' on the backend current_user





















# starter page setup 

## rails setup (back only )
* creates a new rails project using a postgresql
*
* --api is going to make rails only act as an api (rails to have and view ) rails by default is an mvc, doing --api makes our app an mv framework, eventually we use react as the v (view)

* api makes rails backend only, rails doing nothing with the front end (get http request => respond with json(data))

* to create a new rails project 

```
$ rails new <project-name> -d postgresql --api 
$ cd project-name
$ rails db:create 

```

* to view the versions of rails you have installed, and create a new rails project with a specific version of rails 
```
$ gem list rails local
$ rails _6.1.4.7_ new <project name> -d postgresql --api

```


## add gems 
* gems are third part libraries that do stuff
  - faker => allows us to create fake data for our projects
    (gem 'faker', :git => 'https://github.com/faker-ruby/faker.git', :branch => 'master')

  - pry-rails => help us debug 
   ("gem "pry-rails"" - under :development :test section of gemfile )
  - devise-token-auth => help with auth on the backend 
    (gem 'devise_token_auth' - in production section of gemfile)
  - 
* to add a gem: 
  - add gem to your gem file 
  -run bundle to install gem 

## notes about versioning (related to 3rd party libraries)

* before a library/product goes from one version to another(major)
* pre release version
* alpha release: could be very buggy; not widely tested
* beta release: more tested, less buggy, but not stable 
* RC release candidate; candidate for product-release 

* MajorChange.MinorChange.Patch
my3rdPartyLib is version 6.7.3
#some patch: bug fixes made (safe to upgrade)
 - minor change: small improvements  added but no breaking changes so should be safe to upgrade 
 - major update: new features (big improvements) potentially breaks code 

NOTE: to add a gem... add it to your gemfile, then run bundle to install gem

## devise token auth setup (backend)
 1. add to gem file
 
 #using this in our gemfile (might want to use version < 6.2 of rails)  if higher then version 6.2, place the following in the gem file:  
 
 ```
 gem 'devise_token_auth', '>= 1.2.0', git: "https://github.com/lynndylanhurley/devise_token_auth"

 ```
 2. create a devise model 
 ```
 # this creating  a devise 'User' model and some routes
 rails g devise_token_auth:install User api/auth

 ```
 3. add extends in model 
 ```
class User < ActiveRecord::Base
  extend Devise::Models
  ....
```


NOTE: check the following link if you have any troubles with the above devise commands: https://stackoverflow.com/questions/55626625/devise-token-auth-conflicts

 
 4. add columns to our User via a migration
 ```
# create a migration file called TIMESTAMP_add_trackable_to_users.rb
rails g migration add_trackable_to_users
class AddTrackableToUsers < ActiveRecord::Migration[6.0]
  def change
      ## Trackable
      add_column :users, :sign_in_count, :integer, :default => 0
      add_column :users, :current_sign_in_at, :datetime
      add_column :users, :last_sign_in_at, :datetime
      add_column :users, :current_sign_in_ip, :string
      add_column :users, :last_sign_in_ip, :string
  end
end
 ```
 * in terminal: 
```
$ rails db:migrate
```
## Front end Setup

* in rails project, create a react-app
why in rails app? 
- a good way to keep it organized
- also i can share a github repo so prevent the eed to have a client repo and a backend repo

why called client? alias for the front end e.g. 'client does an api call' 

```
yarn create react-app client 

```
## add third party packages (more can always be added later)
- react-router-dom
- axios
- react-bootstrap
- axios-hooks 
```
//in client directory 
$ yarn add react-router-dom axios 
$ yarn add react-bootstrap bootstrap@5.1.3 
$ yarn add axios 
 
```
# add proxy
* add to package.json - add anywhere at route level 

"proxy": "http://localhost:3001",


## folder structure 
-no set way to do this; just depends on your project and preferences 
- assuming you're in the client directory
in terminal: 
```
$ mkdir src/components
$ mkdir src/providers
$ mkdir src/hooks
$ mkdir src/components/auth
$ mkdir src/components/shared 
```

## react router basic setup 

* add routes to index.js/app.js 
* index.js, wrap BrowserRouter
* create a navbar 

## Authentication Setup (using a provider)

## TODO: complete auth setup readme



