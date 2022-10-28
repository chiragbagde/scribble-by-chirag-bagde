# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_task!, only: %i[ update destroy]
  before_action :current_organisation

  def index
    articles = Article.all.as_json(include: { assigned_category: { only: %i[category id] } })
    respond_with_json({ articles: articles })
  end

  def create
    article = Article.create(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_json
  end

  def filter_status
    articles = Article.filter_status(params.permit(:status))
    articles = articles.all.as_json(include: { assigned_category: { only: %i[category id] } })
    respond_with_json({ articles: articles })
  end

  def filter_by_category
    params.permit!
    articles = Article.filter_by_category(params.permit(category: []))
    articles = articles.all.as_json(include: { assigned_category: { only: %i[category id] } })
    respond_with_json({ articles: articles })
  end

  def filter_columns
    articles = Article.filter_columns(params.permit(columns: []))
    respond_with_json({ articles: articles })
  end

  def filter
    articles = Article.filter(params.permit(:title))
    articles = articles.all.as_json(include: { assigned_category: { only: %i[category id] } })
    respond_with_json({ articles: articles })
  end

  private

    def load_task!
      @article = Article.find_by!(id: params[:id])
    end

    def article_params
      params.require(:article).permit(
        :title, :author, :status, :description,
        :assigned_category_id).merge(assigned_organisation_id: @current_organisation)
    end
end
