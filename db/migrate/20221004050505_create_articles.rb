# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.text :title
      t.string :author
      t.string :categories, array: true, default: []
      t.string :status
      t.text :description
      t.timestamps
    end
  end
end
