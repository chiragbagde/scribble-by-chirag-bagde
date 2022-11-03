# frozen_string_literal: true

class RenameColumnsOfRedirections < ActiveRecord::Migration[6.1]
  def change
    rename_column :redirections, :old_url, :from
    rename_column :redirections, :new_url, :to
  end
end
