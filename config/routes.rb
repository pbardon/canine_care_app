Rails.application.routes.draw do

    resources :users, only: [:create, :new, :update, :show]
    resource :session, only: [:create, :new, :destroy]


    namespace :api, defaults: { format: :json } do
      resources :dogs, only: [:create, :index, :update, :show, :destroy] do
        resources :bookings, only: [:index]
      end
      resources :sitters, only: [:create, :index, :update, :show, :destroy] do
        resources :bookings, only: [:index]
      end

      resources :bookings, only: [:create, :destroy, :update]

      resources :sitter_comments, only: [:create, :index, :show, :destroy]

      resources :comments, only: [:index, :create, :show, :update, :destroy]

    end

    root to: 'static_pages#root'

    get "session/guest", to: 'sessions#guest', as: 'guest'

end
