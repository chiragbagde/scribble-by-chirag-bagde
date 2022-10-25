# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    category { Faker::Name.name }
    order { Faker::Number.between(from: 1, to: 100) }
  end
end
