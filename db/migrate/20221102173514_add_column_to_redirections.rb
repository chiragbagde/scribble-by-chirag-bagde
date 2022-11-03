# frozen_string_literal: true

class AddColumnToRedirections < ActiveRecord::Migration[6.1]
  def change
    add_column :redirections, :organisation_id, :integer
  end
end
