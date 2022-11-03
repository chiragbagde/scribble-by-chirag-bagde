# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @organisation = create(:organisation)
    @user = User.create(name: "Oliver Smith", email: "oliver@example.com", organisation: @organisation)
    @category = create(:category, user: @user)
  end

  def test_category_should_not_be_valid_without_user
    @category.user_id = nil
    assert_not @category.save
    assert_includes @category.errors.full_messages, t("missing", entity: "User")
 end

  def test_category_must_be_unique
    new_category = Category.create(category: @category.category, user: @user)
    assert_equal new_category.errors.full_messages.to_sentence, t("unique", entity: "Category")
  end

  def test_update_category_of_articles_to_general_on_delete_category
    new_category = create(:category, user: @user)
    new_article = create(:article, category: new_category, user: @user)
    new_category.destroy!
    assert_equal new_article.category_id - 1, @category.id
  end
end
