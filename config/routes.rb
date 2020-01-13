Rails.application.routes.draw do
  resources :events
  root 'dashboard#index'

  namespace :api do
    resources :events, only: [:index, :create, :update] do
      collection do
        get :search
      end
    end
  end
end
