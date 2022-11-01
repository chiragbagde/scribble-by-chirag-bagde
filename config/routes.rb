# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
  resources :articles, except: %i[new edit show]

  resources :redirections, except: %i[new edit]
  resource :organisation, except: %i[new edit index destroy]
  resource :session, only: %i[create]

  resources :categories do
    get "filter", on: :collection
    put "update_order", on: :collection
  end

  resources :users, only: :index
end

  root "home#index"
  get "*path", to: "home#index", via: :all

end
