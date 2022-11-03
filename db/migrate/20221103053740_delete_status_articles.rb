# frozen_string_literal: true

class DeleteStatusArticles < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :status, :string
  end
end
