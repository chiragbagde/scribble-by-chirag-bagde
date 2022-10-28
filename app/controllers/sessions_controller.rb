# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @organisation = Organisation.find_by!(site_name: login_params[:site_name])
    unless @organisation.authenticate(login_params[:password])
      respond_with_error("Incorrect credentials, try again.", :unauthorized)
    end
  end

  private

    def login_params
      params.require(:login).permit(:site_name, :password)
    end
end
