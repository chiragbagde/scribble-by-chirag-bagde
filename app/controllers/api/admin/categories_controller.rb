# frozen_string_literal: true

class Api::Admin::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update_order destroy]
  before_action :current_user

  def destroy
    DeleteCategoryService.new(
      params[:category], @category,
      current_user).process
    respond_with_success(t("successfully_deleted", entity: "Category"))
  end

  def update_order
    @category.insert_at(params[:category][:position].to_i)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  private

    def load_category!
      @category = current_user.categories.find(params[:id])
    end
end
