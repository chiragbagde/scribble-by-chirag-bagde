
json.extract! category,
  :id,
  :category,
  :order

json.assigned_articles category.assigned_articles, :title, :description, :created_at, :slug
