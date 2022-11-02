# frozen_string_literal: true

class DeleteColumnCategory < ActiveRecord::Migration[6.1]
  def change
    remove_column :categories, :assigned_organisation_id
  end
end
