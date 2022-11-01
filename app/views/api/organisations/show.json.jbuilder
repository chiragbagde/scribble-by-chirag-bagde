# frozen_string_literal: true

json.organisation do
  json.id @current_organisation.id
  json.site_name @current_organisation.site_name
  json.password_digest @current_organisation.password_digest
  json.status @current_organisation.status
  json.authentication_token @current_organisation.authentication_token

  json.users @current_organisation.assigned_users, :name, :id
end
