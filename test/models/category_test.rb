# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @organisation = create(:organisation)
    @category = create(:category, assigned_organisation_id: @organisation.id)
    @article = create(:article, assigned_category_id: @category.id, assigned_organisation_id: @organisation.id)
  end

  def test_category_should_not_be_valid_without_organisation
    @category.assigned_organisation_id = nil
    assert_not @category.save
    assert_includes @category.errors.full_messages, "Assigned organisation must exist"
 end

  def test_update_category_of_articles_to_general_on_delete_category
    category1 = create(:category, assigned_organisation_id: @organisation.id)
    article1 = create(:article, assigned_category_id: category1.id, assigned_organisation_id: @organisation.id)
    category1.destroy!
    assert_equal article1.assigned_category_id - 1, @category.id
  end
end
