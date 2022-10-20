# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    user.save!
    respond_with_success("User was successfully created!")
  end

  private

    def user_params
      params.require(:user).permit(:site_name, :password)
    end
end
