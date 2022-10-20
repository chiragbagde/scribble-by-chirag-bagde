# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  validates :password, length: { minimum: 6 },
    if: -> { password.present? }
end
