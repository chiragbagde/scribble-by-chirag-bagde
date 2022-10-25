# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    old_url { Faker::Internet.url(host: "localhost:3000/dv") }
    new_url { Faker::Internet.url(host: "localhost:3000/vsvs") }
  end
end
