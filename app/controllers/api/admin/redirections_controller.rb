# frozen_string_literal: true

class Api::Admin::RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[ update destroy show]
  before_action :current_organisation

  def index
    @redirections = current_organisation.redirections.all
  end

  def create
    redirection = current_organisation.redirections.create!(redirection_params)
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!
    respond_with_success(t("successfully_deleted", entity: "Redirection"))
  end

  def update
    @redirection.update!(redirection_params)
    respond_with_success(t("successfully_updated", entity: "Redirection"))
  end

  private

    def load_redirection!
      @redirection = current_organisation.redirections.find(params[:id])
    end

    def redirection_params
      params.require(:redirection).permit(:to, :from)
    end
end
