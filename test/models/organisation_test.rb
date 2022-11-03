# frozen_string_literal: true

require "test_helper"

class OrganisationTest < ActiveSupport::TestCase
  MIN_PASSWORD_LENGTH = 6
  def setup
    @organisation = create(:organisation)
    @user = User.create(name: "Oliver Smith", email: "oliver@example.com", organisation: @organisation)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_site_name_cannot_be_null
    @organisation.site_name = ""
    assert @organisation.invalid?
  end

  def test_organisation_should_not_be_saved_without_password
    @organisation.password = nil
    assert_not @organisation.valid?
  end

  def test_Password_should_be_of_valid_length
    @organisation.password = "a" * (MIN_PASSWORD_LENGTH - 1)
    assert @organisation.invalid?
  end

  def test_organisations_should_have_unique_auth_token
    second_organisation = create(:organisation)

    assert_not_same @organisation.authentication_token,
      second_organisation.authentication_token
  end
end
