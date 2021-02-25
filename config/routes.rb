Rails.application.routes.draw do
  root 'homepage#index'
  get 'hacklist/:pageId', to: 'homepage#index'
  get 'hack/:pageId', to: 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :hacks, only: [:index, :show]

      get "hacklist/:id" => "hacks#pagination"
    end
  end
end
