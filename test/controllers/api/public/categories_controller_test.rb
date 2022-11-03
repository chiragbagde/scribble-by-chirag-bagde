# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organisation = create(:organisation)
    @user = User.create(name: "Oliver Smith", email: "oliver@example.com", organisation: @organisation)
    @category = Category.create(category: "General", position: 1, user: @user)
  end

  def test_should_list_all_categories
    get api_public_categories_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].length, Category.count
  end

  def test_should_create_valid_category
    post api_public_categories_path,
      params: { category: { category: "Apps", position: 2 } }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Category")
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
    new_category = Category.create(category: "General", position: 2, user: @user)
    category_params = { category: { position: 2, id: @category.id } }
    put update_order_api_admin_category_path(@category.id), params: category_params
    assert_response :success
    @category.reload
    assert_equal @category.position, 2
  end
end
