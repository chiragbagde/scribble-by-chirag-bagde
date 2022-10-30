# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organisation = create(:organisation)
    @category = Category.create({ category: "General", order: 0, assigned_organisation_id: @organisation.id })
  end

  def test_should_list_all_categories
    get categories_path
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["categories"].length, Category.count
  end

  def test_should_create_valid_category
    post categories_path,
      params: { category: { category: "General", order: 2 } }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Category")
  end

  def test_search_by_category
    @category = Category.create({ category: "Generals", order: 2, assigned_organisation_id: @organisation.id })
    get "/categories/filter", params: { category: "General" }
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["categories"].length, 2
  end

  def test_can_update_category
    newcategory = "Apps & Integration"
    category_params = { category: { category: newcategory } }

    put category_path(@category.id), params: category_params
    assert_response :success
    @category.reload
    assert_equal @category.category, newcategory
  end

  def test_should_destroy_category
    assert_difference "Category.count", -1 do
      delete category_path(@category.id)
    end
    assert_response :ok
  end
end
