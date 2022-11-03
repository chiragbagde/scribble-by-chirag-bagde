# frozen_string_literal: true

class RenameColumnArticles < ActiveRecord::Migration[6.1]
  def change
    rename_column :articles, :assigned_category_id, :category_id
  end
end
