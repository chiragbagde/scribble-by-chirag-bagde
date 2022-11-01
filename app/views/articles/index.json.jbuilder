# frozen_string_literal: true

json.articles @articles do | article |
  json.category article.category, :id, :name, :order
  json.author article.user, :name
end
