# frozen_string_literal: true

class AddForeignKeyToUser < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :users, :organisations, column: :assigned_organisation_id, on_delete: :cascade
  end
end
