# frozen_string_literal: true

class Organisation < ApplicationRecord
  has_secure_password
  has_secure_token :authentication_token
  has_many :assigned_users, foreign_key: :assigned_organisation_id, class_name: "User"

  validates :password, length: { minimum: 6 },
    if: -> { password.present? }
  validates :site_name, presence: true
end
