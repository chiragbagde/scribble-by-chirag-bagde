# frozen_string_literal: true

Rails.application.routes.draw do
  resources :articles, except: %i[new edit show], param: :slug
  resources :redirections, except: %i[new edit]
  resources :users do
    member do
      put :update_status
    end
  end
  resources :categories do
    member do
      put :update_order
    end
  end
  resource :session, only: :create

  root "home#index"
  get "*path", to: "home#index", via: :all

end
