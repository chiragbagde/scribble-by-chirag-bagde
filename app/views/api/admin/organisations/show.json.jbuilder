# frozen_string_literal: true

json.organisation do
  json.extract! @current_organisation,
    :id,
    :site_name,
    :password_digest,
    :status,
    :authentication_token

  json.users @current_organisation.users, :name, :id
end
