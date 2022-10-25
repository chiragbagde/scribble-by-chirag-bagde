# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :assigned_user, foreign_key: :assigned_user_id, class_name: "User"
  has_many :assigned_articles, foreign_key: :assigned_category_id, class_name: "Article"

  before_destroy :reset_articles_category

  def reset_articles_category
    self.assigned_articles.update_all({ assigned_category_id: 1 })
  end
end
