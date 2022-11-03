# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organisation = create(:organisation)
    @user = User.create(name: "Oliver Smith", email: "oliver@example.com", organisation: @organisation)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_list_all_articles
    get api_public_articles_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["articles"].length, Article.count
  end

  def test_should_create_valid_article
    post api_public_articles_path,
      params: {
        article: {
          title: "LearnRuby", description: "Ruby", status: "Published", category_id: @category.id,
          user: @user.id
        }
      }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Article")
  end

  def test_filter_article_status
    first_article = create(:article, category: @category, user: @user)
    first_article.status = "Draft"
    first_article.save!
    get api_public_articles_path, params: { status: "Draft" }
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["articles"].length, 1
  end

  def test_search_article_title
    first_article = create(:article, category: @category, user: @user)
    first_article.title = "Scribble"
    first_article.save!
    get api_public_articles_path, params: { title: "Scribble" }
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["articles"].length, 1
  end

  def test_filter_article_by_category
    new_category = Category.create(category: "Misc", user: @user)
    new_category.category = "Apps"
    new_category.save!
    new_article = create(:article, category: new_category, user: @user)
    get api_public_articles_path, params: { category: [new_category.id] }
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["articles"].length, 1
  end

  def test_creator_can_update_any_article_fields
    new_title = "ScribbleUpdated"
    article_params = {
      article: {
        title: new_title, category_id: @category.id,
        user_id: @user.id
      }
    }
    put api_public_article_path(@article.id), params: article_params
    assert_response :success
    @article.reload
    assert_equal @article.title, new_title
    assert_equal @article.category_id, @category.id
  end

  def test_error_raised_for_duplicate_slug
    another_article = create(:article, category: @category, user: @user)

    assert_raises ActiveRecord::RecordInvalid do
      another_article.update!(slug: @article.slug)
    end

    error_msg = another_article.errors.full_messages.to_sentence
    assert_match t("article.slug.immutable"), error_msg
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
    @article.category_id = nil
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Category must exist"
  end

  def test_valid_slug
    @article.slug = ""
    assert_not @article.valid?
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete api_public_article_path(@article.id)
    end
    assert_response :ok
  end
end
