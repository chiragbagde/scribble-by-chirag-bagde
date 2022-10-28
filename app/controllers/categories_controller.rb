# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[ update destroy show]
  before_action :current_organisation

  def index
    categories = Category.all.order(:order).as_json(
      include: {
        assigned_articles: {
          only: %i[title description id slug
          created_at]
        }
      })
    respond_with_json({ categories: categories })
  end

  def show
    respond_with_json({ category: @category, assigned_articles: @category.assigned_articles })
  end

  def create
    category = Category.create!(category_params)
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def destroy
    @category.destroy!
    respond_with_json
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def update_order
    categories = Category.all
    params.require(:category).permit!
    params[:category][:positions].each_with_index do |list_item, index|
      order = Category.find_by!(id: list_item)
      order.order = index
      order.save!
    end
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  private

    def load_category!
      @category = Category.find_by!(id: params[:id])
    end

    def category_params
      params.require(:category).permit(:category, :order).merge(assigned_organisation_id: @current_organisation)
    end
end
