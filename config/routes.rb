# frozen_string_literal: true

Rails.application.routes.draw do
  resources :articles, except: %i[new edit show] do
    get "filter_columns", on: :collection
    get "filter_by_category", on: :collection
    get "filter_status", on: :collection
    get "filter", on: :collection
  end
  resources :redirections, except: %i[new edit]
  resource :organisation, only: %i[update show]

  resources :categories do
    get "filter", on: :collection
    put "update_order", on: :collection
  end

  resource :session, only: :create
  resources :users, only: :index

  root "home#index"
  get "*path", to: "home#index", via: :all

end
