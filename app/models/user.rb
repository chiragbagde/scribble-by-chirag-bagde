# frozen_string_literal: true

class User < ApplicationRecord
  has_many :articles
  has_many :categories
  belongs_to :organisations, foreign_key: :assigned_organisation_id, class_name: "Organisation"
end
