# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    to { Faker::Internet.url(host: "localhost:3000/") }
    from { Faker::Internet.url(host: "localhost:3000/") }
  end
end
