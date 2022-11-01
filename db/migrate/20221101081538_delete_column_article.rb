# frozen_string_literal: true

class DeleteColumnArticle < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :assigned_organisation_id
  end
end
