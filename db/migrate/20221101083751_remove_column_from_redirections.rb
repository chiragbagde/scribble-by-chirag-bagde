# frozen_string_literal: true

class RemoveColumnFromRedirections < ActiveRecord::Migration[6.1]
  def change
    remove_column :redirections, :assigned_organisation_id
  end
end
