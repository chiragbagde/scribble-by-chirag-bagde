# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { Faker::Name.name }
    description { Faker::Lorem.paragraph }
    status { Faker::Name.name }
  end
end
