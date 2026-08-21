# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :load_task!, only: %i[ update destroy]
  before_action :current_user

  def index
    @articles = current_user.articles
    @articles = FilterArticleService.new(@articles, params).process
  end

  def create
    article = current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  def count
    count_by_status = Article.group(:status).distinct.count
    count_by_category = Article.group(:category_id).distinct.count
    respond_with_json(
      {
        count: {
          count_by_status: { **count_by_status, "All": (Article.count) },
          count_by_category: count_by_category
        }
      })
  end

  private

    def load_task!
      @article = current_user.articles.find(params[:id])
    end

    def article_params
      params.require(:article).permit(
        :title, :author, :status, :description,
        :category_id)
    end
end
