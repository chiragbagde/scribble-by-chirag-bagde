# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  MAX_TITLE_LENGTH = 50

  def setup
    @organisation = create(:organisation)
    @user = User.create(name: "Oliver Smith", email: "oliver@example.com", organisation: @organisation)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_article_should_not_be_valid_without_category
    @article.category = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, t("missing", entity: "Category")
  end

  def test_article_title_should_not_exceed_maximum_length
    @article.title = "a" * (MAX_TITLE_LENGTH + 1)
    assert_not @article.valid?
  end

  def test_unique_slug_with_same_title
    first_article = create(:article, category: @category, user: @user)
    second_article = create(:article, category: @category, user: @user)
    assert_not_equal(first_article.slug, second_article.slug)
  end

  def test_slug_not_generated_on_status_draft
    article = Article.create(
      title: "test1", description: "test", status: "Draft", category: @category,
      user: @user)
    assert_nil(article.slug, "nil")
  end

  def test_creates_multiple_articles_with_unique_slug
    articles = create_list(:article, 10, category: @category, user: @user)
    slugs = articles.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end
end
