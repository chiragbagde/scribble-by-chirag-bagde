# frozen_string_literal: true

class AddStatusArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :status, :string, default: "Draft", null: false
  end
end
