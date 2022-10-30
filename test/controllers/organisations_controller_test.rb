# frozen_string_literal: true

require "test_helper"

class OrganisationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organisation = create(:organisation)
  end

  def test_should_create_valid_organisation
    post organisation_path,
      params: { organisation: { site_name: "Spinkart", password: "welcome1", status: "checked" } }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "organisation")
  end

  def test_can_update_organisation
    site_name = "Spinkart"
    put organisation_path, params: { organisation: { site_name: "Spinkart" } }
    assert_response :success
    @organisation.reload
    assert_equal @organisation.site_name, site_name
  end
end
