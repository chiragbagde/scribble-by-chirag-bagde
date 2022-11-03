# frozen_string_literal: true

class DeleteCategoryService
  attr_reader :params, :current_user

  def initialize(params, category, current_user)
    @category = category
    @params = params
    @current_user = current_user
  end

  def process
    if current_user.categories.count === 1
      if @category.category != "General"
        category = current_user.categories.create!({ category: "General" })
        new_category_id = category.id
      else
        category = current_user.categories.create!({ category: "Getting Started" })
        new_category_id = category.id
      end
    elsif current_user.categories.count > 1
      new_category_id = params.to_i
    end

    @category.articles.update(category_id: new_category_id)
    @category.destroy!
  end
end
