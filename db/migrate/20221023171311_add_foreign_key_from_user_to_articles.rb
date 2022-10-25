# frozen_string_literal: true

class AddForeignKeyFromUserToArticles < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :articles, :users, column: :assigned_user_id
  end
end
