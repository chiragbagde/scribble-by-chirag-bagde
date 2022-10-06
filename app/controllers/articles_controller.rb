# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    articles = Article.all
    respond_with_json({ articles: articles })
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success("Article was successfully created")
  end

  def update
    @article = Article.find_by!(slug: params[:slug])
    @article.update!(article_params)
    respond_with_success("Article was successfully updated!")
  end

  private

    def load_task!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit(:title, :author, :status, :description, categories: [])
    end
end
