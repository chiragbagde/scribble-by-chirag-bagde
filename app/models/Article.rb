# frozen_string_literal: true

class Article < ApplicationRecord
  include Filterable
  belongs_to :assigned_organisation, foreign_key: :assigned_organisation_id, class_name: "Organisation"
  belongs_to :assigned_category, foreign_key: :assigned_category_id, class_name: "Category"

  validates :title, presence: true, length: { maximum: 50 }, format: { with: /\A[a-zA-Z]+\z/ }
  validate :slug_not_changed

  before_create :check_status
  before_update :check_status

  private

    def check_status
      if status === "Published"
        set_slug
      end
    end

    def set_slug
      itr = 1
      loop do
        title_slug = title.parameterize
        slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
        break self.slug = slug_candidate unless Article.exists?(slug: slug_candidate)

        itr += 1
      end
    end

    def slug_not_changed
      if slug && slug_changed? && self.persisted?
        errors.add(:slug, "is immutable!")
      end
    end
end
