# frozen_string_literal: true

class CreateOption < ActiveRecord::Migration[6.1]
  def change
    create_table :options do |t|
      t.string :columns, array: true, default: []
      t.string :status
      t.string :categories, array: true, default: []
      t.timestamps
    end
  end
end
