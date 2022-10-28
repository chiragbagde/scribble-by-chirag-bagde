# frozen_string_literal: true

FactoryBot.define do
  factory :organisation do
    site_name { Faker::Name.name }
    password { "welcome1" }
    status { "checked" }
  end
end
