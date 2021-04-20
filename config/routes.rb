Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  
  root 'homepage#index'

  get ':userId/journeys', to: 'homepage#index'
  get ':userId/journeys/:listId', to: 'homepage#index'
  get 'hacklist/:pageId', to: 'homepage#index'
  get 'hack/:pageId', to: 'homepage#index'
  get 'login', to: 'homepage#index'
  get 'signup', to: 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :hacks, only: [:index, :show] do
        patch "/add_hack_to_list" => "hacks#add_hack_to_list"
        patch "/remove_hack_from_list" => "hacks#remove_hack_from_list"
      end
      resources :users, only: [:show] do
        resources :lists, only: [:index, :show, :create, :update] do
          patch "/position_change" => "lists#position_change"
        end
      end

      get "hacklist/:id" => "hacks#pagination"
    end
  end
end
