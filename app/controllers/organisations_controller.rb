# frozen_string_literal: true

class OrganisationsController < ApplicationController
  def show
    organisations = Organisation.first.as_json(
      include: {
        assigned_articles: { only: %i[title description created_at] },
        assigned_categories: { only: %i[category order] }, assigned_redirections: { only: %i[old_url new_url] }
      })
    respond_with_json({ organisations: organisations })
  end

  def create
    organisation = Organisation.create(organisation_params)
    respond_with_success(t("successfully_created", entity: "organisation"))
  end

  def update
    organisation = Organisation.first
    organisation.update!(organisation_params)
    respond_with_success(t("successfully_updated", entity: "organisation"))
  end

  private

    def organisation_params
      params.require(:organisation).permit(:site_name, :password, :status)
    end
end
