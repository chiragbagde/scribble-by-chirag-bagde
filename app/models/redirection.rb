# frozen_string_literal: true

class Redirection < ApplicationRecord
  validate :check_redirection_loop, on: [:create, :update]
  validate :old_url_and_new_url_not_equal, on: [:create, :update]
  validates :old_url, uniqueness: true, presence: true

  private

    def check_redirection_loop
      if Redirection.find_by(old_url: self.new_url).present?
        if Redirection.find_by(new_url: self.old_url).present?
          errors.add(:base, t("redirection.check_redirection_loop"))
        end
      end
    end

    def old_url_and_new_url_not_equal
      if self.old_url == self.new_url
        errors.add(:base, t("redirection.check_equal"))
      end
    end
end
