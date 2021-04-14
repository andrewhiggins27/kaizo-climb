Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  
  root 'homepage#index'
  get 'hacklist/:pageId', to: 'homepage#index'
  get 'hack/:pageId', to: 'homepage#index'
  get 'login', to: 'homepage#index'
  get 'signup', to: 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :hacks, only: [:index, :show]

      get "hacklist/:id" => "hacks#pagination"
    end
  end
end
