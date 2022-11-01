# frozen_string_literal: true

class AddForeignKeyToArticleFromUser < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :articles, :users, column: :user_id
  end
end
