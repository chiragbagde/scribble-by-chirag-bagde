# frozen_string_literal: true

class Api::OrganisationsController < ApplicationController
  before_action :current_organisation

  def update
    @current_organisation.update!(organisation_params)
    respond_with_success(t("successfully_updated", entity: "organisation"))
  end

  private

    def organisation_params
      params.require(:organisation).permit(:site_name, :password, :status)
    end
end
