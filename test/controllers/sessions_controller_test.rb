# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organisation = create(:organisation)
  end

  def test_should_login_user_with_valid_credentials
    post session_path, params: { login: { site_name: @organisation.site_name, password: @organisation.password } },
      as: :json
    assert_response :success
    assert_equal response.parsed_body["authentication_token"], @organisation.authentication_token
  end

  def test_shouldnt_login_user_with_invalid_credentials
    post session_path, params: { login: { site_name: @organisation.site_name, password: "invalid password" } },
      as: :json
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal response_json["error"], t("session.incorrect_credentials")
  end
end
