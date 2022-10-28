# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organisation = create(:organisation)
    @category = create(:category, assigned_organisation_id: @organisation.id)
    @article = create(:article, assigned_category_id: @category.id, assigned_organisation_id: @organisation.id)
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title can't be blank"
  end

  def test_article_should_not_be_valid_without_description
    @article.description = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Description can't be blank"
  end

  def test_article_should_not_be_valid_without_category
    @article.assigned_category_id = nil
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Assigned category must exist"
  end

  def test_article_should_not_be_valid_without_status
    @article.status = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Status can't be blank"
  end

  def test_valid_slug
    @article.slug = ""
    assert_not @article.valid?
  end

  def test_can_update_article
    updated_title = "Updated"
    article_params = { article: { title: updated_title } }
    put article_path(@article.slug), params: article_params
 end

  def test_should_destroy_category
    assert_difference "Article.count", -1 do
      delete article_path(@article.id)
    end
    assert_response :ok
  end
end
