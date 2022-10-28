# frozen_string_literal: true

class Category < ApplicationRecord
  include Filterable
  belongs_to :assigned_organisation, foreign_key: :assigned_organisation_id, class_name: "Organisation"
  has_many :assigned_articles, foreign_key: :assigned_category_id, class_name: "Article"

  before_destroy :reset_articles_category

  def reset_articles_category
    self.assigned_articles.update_all({ assigned_category_id: Category.where(category: "General").first.id })
  end
end
