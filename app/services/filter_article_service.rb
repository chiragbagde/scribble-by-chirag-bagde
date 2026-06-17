# frozen_string_literal: true

class FilterArticleService
  SORTABLE_COLUMNS = %w[title status created_at updated_at].freeze

  attr_reader :articles, :params

  def initialize(articles, params)
    @articles = articles
    @params = params
  end

  def process
    if params.has_key?(:status) && params[:status] != "All"
      @articles = @articles.where(status: params[:status])
    end

    if params.has_key?(:category) && params[:category] != []
      @articles = @articles.where(category_id: params[:category])
    end

    if params.has_key?(:title)
      @articles = @articles.where("title LIKE ?", "%#{params[:title]}%")
    end

    apply_sorting
    articles
  end

  private

    def apply_sorting
      return unless params[:sort_by].present? && SORTABLE_COLUMNS.include?(params[:sort_by])

      direction = params[:sort_order].to_s.casecmp("asc").zero? ? :asc : :desc
      @articles = @articles.order(params[:sort_by] => direction)
    end
end
