# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    namespace :api do
      namespace :public do
        resources :articles, except: %i[new edit show] do
          get "count", on: :collection
        end
        resources :categories, except: %i[destroy]
      end
      namespace :admin do
        resources :categories, only: %i[destroy] do
          member do
            put "update_order"
          end
        end
        resources :redirections, except: %i[new edit]
        resource :organisation, except: %i[new edit index destroy]
        resource :session, only: %i[create]
        resources :users, only: :index
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
