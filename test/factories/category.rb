# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    category { "General" }
    order { Faker::Number.between(from: 1, to: 10) }
  end
end
