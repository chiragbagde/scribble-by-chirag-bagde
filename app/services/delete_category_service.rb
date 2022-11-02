# frozen_string_literal: true

class DeleteCategoryService
  attr_reader :category, :params, :current_user, :categories

  def initialize(params, category, current_user)
    @category = category
    @params = params
    @current_user = current_user
    @categories = @current_user.categories
  end

  def process
    if @current_user.categories.count === 1
      if @category.category != "General"
        category = @current_user.categories.create!({ category: "General" })
        new_category_id = category.id
      else
        category = @current_user.categories.create!({ category: "Getting Started" })
        new_category_id = category.id
      end
    elsif @current_user.categories.count > 1
      new_category_id = params[1].to_i
    end

    @category.assigned_articles.update(assigned_category_id: new_category_id)
    @category.destroy!
  end
end
