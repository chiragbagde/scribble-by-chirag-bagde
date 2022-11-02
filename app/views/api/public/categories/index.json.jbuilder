# frozen_string_literal: true

json.categories @categories do | category |
  json.partial! "api/public/categories/category", category: category
end
