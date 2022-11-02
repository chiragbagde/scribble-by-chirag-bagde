# frozen_string_literal: true

class FilterCategoryService
  attr_reader :params, :categories

  def initialize(categories, params)
    @categories = categories
    @params = params
  end

  def process
    if params
      categories = @categories.where("category LIKE ?", "%#{params[:category]}%%")
    else
      @categories
    end
  end
end
