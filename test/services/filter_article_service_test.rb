# frozen_string_literal: true

require "test_helper"

class FilterArticleServiceTest < ActiveSupport::TestCase
  def setup
    @organisation = create(:organisation)
    @user = User.create!(name: "Oliver Smith", email: "oliver@example.com", organisation: @organisation)
    @category = create(:category, user: @user)
    @alpha = create(:article, title: "alpha", status: "Published", category: @category, user: @user)
    @charlie = create(:article, title: "charlie", status: "Draft", category: @category, user: @user)
    @bravo = create(:article, title: "bravo", status: "Published", category: @category, user: @user)
  end

  def test_filters_by_status
    result = FilterArticleService.new(@user.articles, { status: "Draft" }).process
    assert_equal [@charlie.id], result.pluck(:id)
  end

  def test_filters_by_title_substring
    result = FilterArticleService.new(@user.articles, { title: "brav" }).process
    assert_equal [@bravo.id], result.pluck(:id)
  end

  def test_sorts_by_title_ascending
    result = FilterArticleService.new(@user.articles, { sort_by: "title", sort_order: "asc" }).process
    assert_equal %w[alpha bravo charlie], result.pluck(:title)
  end

  def test_sorts_by_title_descending
    result = FilterArticleService.new(@user.articles, { sort_by: "title", sort_order: "desc" }).process
    assert_equal %w[charlie bravo alpha], result.pluck(:title)
  end

  def test_ignores_non_whitelisted_sort_column
    result = FilterArticleService.new(@user.articles, { sort_by: "description" }).process
    assert_equal 3, result.count
  end
end
