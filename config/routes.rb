Rails.application.routes.draw do
	
  get 'hello_world', to: 'hello_world#index'
  get 'home', to: 'home#index'
  root 'home#index'
  get '/child/:id', to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users do
  	resources :works do 
  		resources :projects
  	end
  	resources :skills do
  		resources :technologies
  	end
  	resources :hobbies
  end
  resources :works
  resources :projects
  resources :skills
  resources :technologies
end
Rails.application.routes.default_url_options[:only_path] = true