# frozen_string_literal: true

class AddForeignKeyToArticle < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :articles, :categories, column: :assigned_category_id, on_delete: :cascade
  end
end
