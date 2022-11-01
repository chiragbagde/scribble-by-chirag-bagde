# frozen_string_literal: true

json.articles @articles do | article |
  json.partial! "api/articles/article", article: article
end
