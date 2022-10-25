# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  include ActionView::Helpers::TranslationHelper
  include FactoryBot::Syntax::Methods

  parallelize(workers: :number_of_processors)

  # fixtures :all
end
