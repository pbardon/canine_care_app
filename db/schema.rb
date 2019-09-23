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

ActiveRecord::Schema.define(version: 2019_08_21_033954) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "bookings", id: :serial, force: :cascade do |t|
    t.integer "sitter_id", null: false
    t.integer "dog_id", null: false
    t.date "date_start", null: false
    t.date "date_end", null: false
    t.boolean "confirmed", default: false
    t.boolean "completed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "message"
  end

  create_table "comments", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.text "content"
    t.date "comment_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "rating"
    t.integer "commentable_id"
    t.string "commentable_type"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "dogs", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.string "size", null: false
    t.text "description", null: false
    t.integer "age", null: false
    t.float "avg_rating", default: 0.0
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_dogs_on_name"
    t.index ["user_id"], name: "index_dogs_on_user_id"
  end

  create_table "photos", force: :cascade do |t|
    t.string "imageable_type"
    t.bigint "imageable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["imageable_type", "imageable_id"], name: "index_photos_on_imageable_type_and_imageable_id"
  end

  create_table "sitters", id: :serial, force: :cascade do |t|
    t.integer "user_id", null: false
    t.float "avg_rating", default: 0.0, null: false
    t.string "sitter_name", null: false
    t.text "description", null: false
    t.integer "price", null: false
    t.boolean "small", default: false
    t.boolean "medium", default: false
    t.boolean "large", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "street_address"
    t.string "city"
    t.string "zipcode"
    t.string "state"
    t.float "latitude"
    t.float "longitude"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
