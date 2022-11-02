
json.extract! article,
  :id,
  :title,
  :description,
  :created_at,
  :slug,
  :status,
  :assigned_category_id

json.assigned_category article.assigned_category, :id, :category
json.author article.user, :name, :assigned_organisation_id
