# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organisation = create(:organisation)
    @category = create(:category, assigned_organisation_id: @organisation.id)
    @article = create(:article, assigned_category_id: @category.id, assigned_organisation_id: @organisation.id)
  end

  def test_should_list_all_articles
    get articles_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, Article.count
  end

  def test_should_create_valid_article
    post articles_path,
      params: {
        article: {
          title: "Learn Ruby", assigned_category_id: @category.id,
          assigned_organisation_id: @organisation.id
        }
      }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Article")
  end

  def test_filter_article_status
    article1 = create(:article, assigned_category_id: @category.id, assigned_organisation_id: @organisation.id)
    article1.status = "Draft"
    article1.save!
    get "/articles/filter_status", params: { status: "Draft" }
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["articles"].length, 1
  end

  def test_search_article_title
    article1 = create(:article, assigned_category_id: @category.id, assigned_organisation_id: @organisation.id)
    article1.title = "Scribble"
    article1.save!
    get "/articles/filter", params: { title: "Scribble" }
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["articles"].length, 1
  end

  def test_filter_article_by_category
    category1 = create(:category, assigned_organisation_id: @organisation.id)
    category1.category = "Apps"
    category1.save!
    article1 = create(:article, assigned_category_id: category1.id, assigned_organisation_id: @organisation.id)
    get "/articles/filter_by_category", params: { category: ["Apps"] }
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["articles"].length, 1
  end

  def test_creator_can_update_any_article_fields
    new_title = "ScribbleUpdated"
    article_params = {
      article: {
        title: new_title, assigned_category_id: @category.id,
        assigned_organisation_id: @organisation.id
      }
    }

    put article_path(@article.id), params: article_params
    assert_response :success
    @article.reload
    assert_equal @article.title, new_title
    assert_equal @article.assigned_category_id, @category.id
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

  def test_should_destroy_category
    assert_difference "Article.count", -1 do
      delete article_path(@article.id)
    end
    assert_response :ok
  end
end
