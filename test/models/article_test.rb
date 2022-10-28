# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @site = create(:site)
    @category = create(:category, assigned_site_id: @site.id)
    @article = create(:article, category_id: @category.id, assigned_site_id: @site.id)
  end

  def test_valid_slug
    @article.slug = ""
    assert_not @article.valid?
   end
end
