# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @organisation = create(:organisation)
    @user = User.create(name: "Oliver Smith", email: "oliver@example.com", organisations: @organisation)
    @category = Category.create(category: "General", order: 0, user: @user)
  end

  def test_category_should_not_be_valid_without_user
    @category.user_id = nil
    assert_not @category.save
    assert_includes @category.errors.full_messages, "User must exist"
 end

  def test_update_category_of_articles_to_general_on_delete_category
    new_category = create(:category, user: @user)
    new_article = create(:article, assigned_category: new_category, user: @user)
    new_category.destroy!
    assert_equal new_article.assigned_category_id - 1, @category.id
  end
end
