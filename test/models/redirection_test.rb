# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @organisation = create(:organisation)
    @redirection = create(:redirection, organisation: @organisation)
  end

  def test_to_and_from_uniqueness
    new_redirection = @redirection.dup
    assert_not new_redirection.valid?
  end

  def test_invalid_cyclic_loop
    redirection = Redirection.create(to: "/1", from: "/2", organisation: @organisation)
    redirection_one = Redirection.create(to: "/2", from: "/3", organisation: @organisation)
    redirection_two = Redirection.create(to: "/3", from: "/4", organisation: @organisation)
    redirection_three = Redirection.create(to: "/4", from: "/1", organisation: @organisation)
    assert_equal redirection_three.errors.full_messages.to_sentence,
      t("redirection.check_redirection_loop")
  end

  def test_valid_cyclic_loop
    redirection = Redirection.create!(to: "/3", from: "/2", organisation: @organisation)
    redirection_one = Redirection.create!(to: "/5", from: "/3", organisation: @organisation)
    redirection_two = Redirection.create!(to: "/2", from: "/4", organisation: @organisation)
    redirection_three = Redirection.new(to: "/1", from: "/2", organisation: @organisation)
    assert_equal redirection_three.save, true
  end

  def test_to_and_from_equal
    redirection = Redirection.create(to: "/1", from: "/1")
    assert_not redirection.valid?
  end
end
