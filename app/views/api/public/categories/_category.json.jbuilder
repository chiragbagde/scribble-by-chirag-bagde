
json.extract! category,
  :id,
  :category,
  :position

json.articles category.articles, :title, :description, :created_at, :slug
