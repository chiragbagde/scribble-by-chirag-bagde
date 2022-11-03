# frozen_string_literal: true

class User < ApplicationRecord
  has_many :articles
  has_many :categories
  has_many :redirections
  belongs_to :organisation
end
