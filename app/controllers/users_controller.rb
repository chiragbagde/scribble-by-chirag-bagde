# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    user = User.first
    respond_with_json({ user: user })
  end
end
