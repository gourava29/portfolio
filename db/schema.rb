# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170930023627) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "connections", force: :cascade do |t|
    t.string "name"
    t.string "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_connections_on_user_id"
  end

  create_table "hobbies", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_hobbies_on_user_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "work_id"
    t.index ["work_id"], name: "index_projects_on_work_id"
  end

  create_table "projects_skills", id: false, force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "skill_id", null: false
  end

  create_table "relationships", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "work_id"
    t.bigint "user_id"
    t.index ["user_id"], name: "index_relationships_on_user_id"
    t.index ["work_id"], name: "index_relationships_on_work_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.string "efficiency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_skills_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "works", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_works_on_user_id"
  end

  add_foreign_key "connections", "users"
  add_foreign_key "hobbies", "users"
  add_foreign_key "projects", "works"
  add_foreign_key "relationships", "users"
  add_foreign_key "relationships", "works"
  add_foreign_key "skills", "users"
  add_foreign_key "works", "users"
end
