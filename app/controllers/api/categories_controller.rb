# frozen_string_literal: true

class Api::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[ update destroy]
  before_action :current_user

  def index
    @categories = @current_user.categories.order(:order)
  end

  def create
    category = @current_user.categories.create!(category_params)
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def destroy
    @category.destroy!
    respond_with_success(t("successfully_deleted", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def update_order
    params[:category][:positions].each_with_index do |list_item, index|
      order = Category.find_by!(id: list_item)
      order.order = index
      order.save!
    end
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def filter
    categories = Category.filter(params.permit(:category))
    respond_with_json({ categories: categories })
  end

  private

    def load_category!
      @category = current_user.categories.find_by!(id: params[:id])
    end

    def category_params
      params.require(:category).permit(:category, :order)
    end
end
