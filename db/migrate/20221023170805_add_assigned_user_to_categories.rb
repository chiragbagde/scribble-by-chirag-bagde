# frozen_string_literal: true

class AddAssignedUserToCategories < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :assigned_user_id, :integer
  end
end
