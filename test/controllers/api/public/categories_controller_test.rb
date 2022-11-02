# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organisation = create(:organisation)
    @user = User.create(name: "Oliver Smith", email: "oliver@example.com", organisations: @organisation)
    @category = Category.create(category: "General", order: 1, user: @user)
  end

  def test_should_list_all_categories
    get api_public_categories_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].length, Category.count
  end

  def test_should_create_valid_category
    post api_public_categories_path,
      params: { category: { category: "General", order: 2 } }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Category")
  end

  def test_search_by_category
    @category = Category.create({ category: "Generals", order: 2, user: @user })
    get api_public_categories_path, params: { category: "General" }
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["categories"].length, 2
  end

  def test_can_update_category
    newcategory = "Apps & Integration"
    category_params = { category: { category: newcategory } }

    put api_public_category_path(@category.id), params: category_params
    assert_response :success
    @category.reload
    assert_equal @category.category, newcategory
  end

  def test_can_update_order
    new_category = Category.create({ category: "General", order: 2, user: @user })
    category_params = { category: { position: 2, id: @category.id } }
    put update_order_api_public_category_path(@category.id), params: category_params
    assert_response :success
    @category.reload
    assert_equal @category.order, 2
  end

  def test_should_destroy_category
    new_category = Category.create({ category: "Apps", order: 2, user: @user })
    @article = create(:article, assigned_category: new_category, user: @user)

    assert_difference "Category.count", -1 do
      delete api_public_category_path(new_category.id), params: { category: [new_category.id, @category.id] }
    end
    assert_response :ok
    assert_equal @category.assigned_articles.length, 1
  end
end
