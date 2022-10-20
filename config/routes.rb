# frozen_string_literal: true

Rails.application.routes.draw do
  resources :articles, except: %i[new edit show], param: :slug
  resources :users
  resources :categories do
    member do
      patch :update_number_two
      put :update_number_two
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all

end
