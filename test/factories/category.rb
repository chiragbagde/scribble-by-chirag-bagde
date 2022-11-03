# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    category { Faker::Name.name }
    position { Faker::Number.between(from: 1, to: 10) }
  end
end
