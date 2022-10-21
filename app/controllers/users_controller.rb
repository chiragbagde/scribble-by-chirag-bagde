# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :load_category!, only: %i[update update_status]

  def index
    users = User.all
    respond_with_json({ users: users })
  end

  def create
    user = User.new(user_params)
    user.save!
    respond_with_success("User was successfully created!")
  end

  def update
    user = User.find_by!(id: params[:id])
    user.update!(user_params)
    respond_with_success("User was successfully updated!")
  end

  def update_status
    user = User.find_by!(id: params[:id])
    puts params[:id]
    user.update!(user_status_params)
    respond_with_success("User status was successfully updated!")
  end

  private

    def load_category!
      @user = User.find_by!(id: params[:id])
    end

    def user_status_params
      params.require(:user).permit(:site_name, :status)
    end

    def user_params
      params.require(:user).permit(:site_name, :password, :status)
    end
end
