# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :load_category!, only: %i[update update_status]

  def index
    users = User.all
    users = User.all.as_json(
      include: {
        assigned_articles: { only: %i[title description created_at] },
        assigned_categories: { only: %i[category order] }, assigned_redirections: { only: %i[old_url new_url] }
      })
    respond_with_json({ users: users })
  end

  def create
    user = User.new(user_params)
    user.save!
    respond_with_success(t("successfully_created", entity: "User"))
  end

  def update
    @user.update!(user_params)
    respond_with_success(t("successfully_updated", entity: "User"))
  end

  def update_status
    @user.update!(user_status_params)
    respond_with_success(t("successfully_updated", entity: "User"))
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