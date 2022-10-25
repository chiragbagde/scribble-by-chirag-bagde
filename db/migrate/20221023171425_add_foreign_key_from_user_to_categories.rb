# frozen_string_literal: true

class AddForeignKeyFromUserToCategories < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :categories, :users, column: :assigned_user_id
  end
end
