# frozen_string_literal: true

class RenameColumnOrganisationInUsers < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :assigned_organisation_id, :organisation_id
  end
end
