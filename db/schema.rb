# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140730234252) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookings", force: :cascade do |t|
    t.integer  "sitter_id",                  null: false
    t.integer  "dog_id",                     null: false
    t.date     "date_start",                 null: false
    t.date     "date_end",                   null: false
    t.boolean  "confirmed",  default: false
    t.boolean  "completed",  default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "message"
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",          null: false
    t.text     "content"
    t.date     "comment_date",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "rating"
    t.integer  "commentable_id"
    t.string   "commentable_type"
  end

  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "dogs", force: :cascade do |t|
    t.string   "name",                                 null: false
    t.string   "size",                                 null: false
    t.text     "description",                          null: false
    t.integer  "age",                                  null: false
    t.float    "avg_rating",             default: 0.0
    t.integer  "owner_id",                             null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "dog_photo_file_name"
    t.string   "dog_photo_content_type"
    t.integer  "dog_photo_file_size"
    t.datetime "dog_photo_updated_at"
  end

  add_index "dogs", ["name"], name: "index_dogs_on_name", using: :btree
  add_index "dogs", ["owner_id"], name: "index_dogs_on_owner_id", using: :btree

  create_table "sitters", force: :cascade do |t|
    t.integer  "user_id",                                   null: false
    t.float    "avg_rating",                default: 0.0,   null: false
    t.string   "sitter_name",                               null: false
    t.text     "description",                               null: false
    t.integer  "price",                                     null: false
    t.boolean  "small",                     default: false
    t.boolean  "medium",                    default: false
    t.boolean  "large",                     default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "street_address"
    t.string   "city"
    t.string   "zipcode"
    t.string   "state"
    t.string   "sitter_photo_file_name"
    t.string   "sitter_photo_content_type"
    t.integer  "sitter_photo_file_size"
    t.datetime "sitter_photo_updated_at"
    t.float    "latitude"
    t.float    "longitude"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",            null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
