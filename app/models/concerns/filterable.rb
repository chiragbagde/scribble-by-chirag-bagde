# frozen_string_literal: true

module Filterable
  extend ActiveSupport::Concern

  module ClassMethods
    def filter_columns(filtering_params)
      articles = Article.select(filtering_params[:columns])
    end

    def filter_status(filtering_params)
      articles = Article.where({ status: filtering_params[:status] })
    end

    def filter_by_category(filtering_params)
      selected_categories = Category.where(category: filtering_params[:category])
      articles = Article.where({ assigned_category_id: selected_categories })
    end

    def filter(filtering_params)
      if filtering_params[:title]
        articles = Article.where("title LIKE ?", "%#{filtering_params[:title]}%%")
      else
        categories = Category.where("category LIKE ?", "%#{filtering_params[:category]}%%")
      end
    end
  end
end
