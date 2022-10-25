# frozen_string_literal: true

class AddAssignedUserToRedirections < ActiveRecord::Migration[6.1]
  def change
    add_column :redirections, :assigned_user_id, :integer
  end
end
