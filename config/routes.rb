# frozen_string_literal: true

Rails.application.routes.draw do
  resources :articles, except: %i[new edit show] do
    get "filter_columns", on: :collection
    get "filter_by_category", on: :collection
    get "filter_status", on: :collection
    get "filter", on: :collection
  end
  resources :redirections, except: %i[new edit]
  resources :organisations do
    member do
      put :update_status
    end
  end
  resources :categories do
    get "filter", on: :collection
    member do
      put :update_order
    end
  end
  resource :session, only: :create
  resources :options

  root "home#index"
  get "*path", to: "home#index", via: :all

end
