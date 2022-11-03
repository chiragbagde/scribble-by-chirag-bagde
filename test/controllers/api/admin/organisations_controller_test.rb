# frozen_string_literal: true

require "test_helper"

class OrganisationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organisation = create(:organisation)
    @user = User.create(name: "Oliver Smith", email: "oliver@example.com", organisation: @organisation)
    @category = create(:category, user_id: @user.id)
    @article = create(:article, category: @category, user: @user) end

  def test_can_update_organisation
    site_name = "Spinkart"
    put api_admin_organisation_path, params: { organisation: { site_name: "Spinkart" } }
    assert_response :success
    @organisation.reload
    assert_equal @organisation.site_name, site_name
  end
end
