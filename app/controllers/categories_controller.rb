# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[ update destroy]

  def show
    category = Category.find_by!(id: params[:id])
    assigned_articles = category.assigned_articles
    respond_with_json({ category: category, assigned_articles: category.assigned_articles })
  end

  def index
    categories = Category.all.as_json(include: { assigned_articles: { only: %i[title description id created_at] } })
    respond_with_json({ categories: categories })
  end

  def create
    category = Category.new(category_params)
    category.save!
    respond_with_success("Category was successfully created")
  end

  def destroy
    @category.destroy!
    respond_with_json
  end

  def update
    @category.update!(category_params)
    respond_with_success("Category was successfully updated!")
  end

  def update_number_two
    category = Category.find_by!(id: params[:id])
    categories = Category.all
    params[:positions].each_with_index do |list_item, index|
      order = Category.find_by!(id: list_item)
      order.order = index
      order.save!
    end
    respond_with_success("Category was successfully updated!")
  end

  private

    def load_category!
      @category = Category.find_by!(id: params[:id])
    end

    def category_update_params
      params.permit(:positions, :id)
    end

    def category_params
      params.require(:category).permit(:category, :order)
    end
end
