# frozen_string_literal: true

json.redirections @redirections do | redirection |
   json.partial! "api/admin/redirections/redirection", redirection: redirection
 end
