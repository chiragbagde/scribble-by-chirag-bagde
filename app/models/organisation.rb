# frozen_string_literal: true

class Organisation < ApplicationRecord
  has_secure_password
  has_secure_token :authentication_token
  has_many :users
  has_many :redirections

  validates :password, length: { minimum: 6 },
    if: -> { password.present? }
  validates :site_name, presence: true

  enum status: { checked: "checked", unchecked: "unchecked" }
end
