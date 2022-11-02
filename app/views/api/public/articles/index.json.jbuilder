json.articles @articles do | article |
  json.partial! "api/public/articles/article", article: article
 end
