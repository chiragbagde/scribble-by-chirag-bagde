# frozen_string_literal: true

class OrganisationsController < ApplicationController
  before_action :load_category!, only: %i[update update_status]

  def index
    organisations = Organisation.all
    organisations = Organisation.all.as_json(
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
    @organisation.update!(organisation_params)
    respond_with_success(t("successfully_updated", entity: "organisation"))
  end

  private

    def load_category!
      @organisation = Organisation.find_by!(id: params[:id])
    end

    def organisation_params
      params.require(:organisation).permit(:site_name, :password, :status)
    end
end
