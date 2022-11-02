# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection)
  end

  def test_old_url_uniqueness
    new_redirection = @redirection.dup
    assert_not new_redirection.valid?
  end

  def test_cyclic_loop
    redirection = Redirection.create(old_url: "/1", new_url: "/2")
    redirection1 = Redirection.create(old_url: "/2", new_url: "/3")
    redirection2 = Redirection.create(old_url: "/3", new_url: "/4")
    redirection3 = Redirection.create(old_url: "/4", new_url: "/1")
    assert_not redirection3.valid?
  end

  def test_from_and_to
    redirection = Redirection.create(old_url: "/1", new_url: "/1")
    assert_not redirection.valid?
  end
end
