# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    title { "scribble" }
    description { Faker::Lorem.paragraph }
    status { "Published" }
  end
end
