# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :user
  has_many :articles

  validates :category, uniqueness: true

  acts_as_list
end
