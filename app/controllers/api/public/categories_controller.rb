# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[ update destroy update_order]
  before_action :current_user

  def index
    @categories = current_user.categories.order(:position)
    @categories = FilterCategoryService.new(@categories, params).process
  end

  def create
    category = current_user.categories.create!(category_params)
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  private

    def load_category!
      @category = current_user.categories.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:category, :position)
    end
end
