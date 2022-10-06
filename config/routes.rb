# frozen_string_literal: true

Rails.application.routes.draw do
  resources :articles, only: %i[create update index], param: :slug

  root "home#index"
  get "*path", to: "home#index", via: :all
end
