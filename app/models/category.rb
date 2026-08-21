# frozen_string_literal: true

class Category < ApplicationRecord
  REGEX = /\A[a-zA-Z_&_ ]*$\z/

  belongs_to :user
  has_many :articles

  validates :category, uniqueness: true, format: { with: REGEX }

  acts_as_list
end
