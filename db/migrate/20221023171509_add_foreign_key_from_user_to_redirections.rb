# frozen_string_literal: true

class AddForeignKeyFromUserToRedirections < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :redirections, :users, column: :assigned_user_id
  end
end
