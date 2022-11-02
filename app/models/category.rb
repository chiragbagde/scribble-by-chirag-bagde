# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :user, foreign_key: :user_id, class_name: "User"
  has_many :assigned_articles, foreign_key: :assigned_category_id, class_name: "Article"

  acts_as_list column: :order
end
