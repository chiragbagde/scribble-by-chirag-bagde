# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.text :title
      t.string :author
      t.string :category
      t.string :status
      t.timestamps
    end
  end
end
