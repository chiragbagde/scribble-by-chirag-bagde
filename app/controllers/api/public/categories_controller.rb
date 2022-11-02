# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[ update destroy update_order]
  before_action :current_user

  def index
    @categories = @current_user.categories.order(:order)
    @categories = FilterCategoryService.new(@categories, params).process()
  end

  def create
    category = @current_user.categories.create!(category_params)
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def destroy
    DeleteCategoryService.new(params[:category], @category, @current_user).process()
    respond_with_success(t("successfully_deleted", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def update_order
    @category.insert_at(params[:category][:position].to_i)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  private

    def load_category!
      @category = current_user.categories.find_by!(id: params[:id])
    end

    def category_params
      params.require(:category).permit(:category, :order)
    end
end
