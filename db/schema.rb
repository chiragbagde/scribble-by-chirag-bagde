# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_11_01_083751) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.text "title"
    t.string "author"
    t.string "status"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug"
    t.integer "assigned_category_id"
    t.integer "user_id"
    t.index ["slug"], name: "index_articles_on_slug", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "order"
    t.integer "user_id"
  end

  create_table "organisations", force: :cascade do |t|
    t.string "password_digest", null: false
    t.string "site_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "authentication_token"
    t.string "status"
  end

  create_table "redirections", force: :cascade do |t|
    t.string "old_url"
    t.string "new_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.integer "assigned_organisation_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "articles", "categories", column: "assigned_category_id", on_delete: :cascade
  add_foreign_key "articles", "users"
  add_foreign_key "categories", "users", on_delete: :cascade
  add_foreign_key "users", "organisations", column: "assigned_organisation_id", on_delete: :cascade
end
