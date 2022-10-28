# frozen_string_literal: true

class OptionsController < ApplicationController
  before_action :load_option!, only: %i[show update]

  def index
    options = Option.all
    respond_with_json({ options: options })
  end

  def show
    respond_with_json({ option: @option })
  end

  def update
    @option.update!(option_params)
    respond_with_success(t("successfully_updated", entity: "Options"))
  end

  private

    def load_option!
      @option = Option.find_by!(id: params[:id])
    end

    def option_params
      params.require(:option).permit(:status, columns: [], categories: [])
    end
end
