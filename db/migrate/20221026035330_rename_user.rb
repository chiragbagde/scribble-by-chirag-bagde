# frozen_string_literal: true

class RenameUser < ActiveRecord::Migration[6.1]
  def change
    rename_table :users, :organisations
  end
end
