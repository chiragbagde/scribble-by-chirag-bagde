# frozen_string_literal: true

class RenameColumnOfCategories < ActiveRecord::Migration[6.1]
  def change
    rename_column :categories, :order, :position
  end
end
