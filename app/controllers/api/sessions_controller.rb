# frozen_string_literal: true

class Api::SessionsController < ApplicationController
  before_action :current_organisation

  def create
    unless @current_organisation.authenticate(login_params[:password])
      respond_with_error("Incorrect credentials, try again.", :unauthorized)
    end
  end

  private

    def login_params
      params.require(:login).permit(:site_name, :password)
    end
end
