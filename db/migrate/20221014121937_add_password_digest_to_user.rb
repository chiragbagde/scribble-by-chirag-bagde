# frozen_string_literal: true

class AddPasswordDigestToUser < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |u|
      u.string :password_digest, null: false
      u.string :site_name
      u.timestamps
    end
  end
end
