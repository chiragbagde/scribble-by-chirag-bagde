# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_secure_token :authentication_token

  validates :password, length: { minimum: 6 },
    if: -> { password.present? }
end
