Rails.application.routes.draw do
  resources :users
  # get 'home/index'

  # 
  get '/current_user' => 'users#current_user'

  # perform a login in response to the Kairos API
  post '/face_login' => 'users#recognise_user_login'


  root to: "home#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
