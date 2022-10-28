# frozen_string_literal: true

class RenameColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :articles, :assigned_user_id, :assigned_organisation_id
    rename_column :categories, :assigned_user_id, :assigned_organisation_id
    rename_column :redirections, :assigned_user_id, :assigned_organisation_id
  end
end
