# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable

  private

    def current_organisation
      @current_organisation = Organisation.first
    end

    def current_user
      current_organisation
      @_current_user ||= @current_organisation.users.first
    end
end
