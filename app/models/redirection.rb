# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :organisation

  validate :check_if_redirection_cycle_present, on: [:create, :update]
  validates :to, uniqueness: { scope: :from }

  private

    def check_redirection_loop
      is_cyclic = true
      current_to = self.to

      while self.from != current_to
        if Redirection.where(from: current_to).present?
          current_to = Redirection.find_by!(from: current_to).to
        else
          is_cyclic = false
          break
        end
      end
      if is_cyclic
        errors.add(:base, t("redirection.check_redirection_loop"))
      end
    end

    def check_if_redirection_cycle_present
      if self.to == self.from
        errors.add(:base, t("redirection.check_equal"))
      elsif check_redirection_loop
      end
    end
end
