# frozen_string_literal: true

class AddForeignKeyToRedirections < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :redirections, :organisations, on_delete: :cascade
  end
end
