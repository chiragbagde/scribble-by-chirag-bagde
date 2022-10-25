# frozen_string_literal: true

class AddAssignedUserToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :assigned_user_id, :integer
  end
end
