# frozen_string_literal: true

class Article < ApplicationRecord
  belongs_to :category
  belongs_to :user

  validates :title, presence: true, length: { maximum: 50 }, format: { with: /\A[a-z0-9A-Z]+\z/ }
  validate :slug_not_changed
  validates :description, presence: true

  enum status: { Draft: "Draft", Published: "Published" }, _default: :Draft

  before_create :check_status_to_set_slug
  before_update :check_status_to_set_slug

  private

    def check_status_to_set_slug
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
