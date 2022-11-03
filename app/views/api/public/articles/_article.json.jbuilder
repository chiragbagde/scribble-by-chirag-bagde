# frozen_string_literal: true

json.extract! article,
  :id,
  :title,
  :description,
  :created_at,
  :slug,
  :status,
  :category_id

json.category article.category, :id, :category
json.author article.user, :name, :organisation_id
