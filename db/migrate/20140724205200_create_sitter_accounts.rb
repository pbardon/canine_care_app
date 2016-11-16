class CreateSitterAccounts < ActiveRecord::Migration
  def change
    create_table :sitters do |t|
      t.integer :user_id, null: false
      t.integer :avg_rating, null: false
      t.string :sitter_name, null: false
      t.text :description, null: false
      t.integer :price, null: false
      t.boolean :small, default: false
      t.boolean :medium, default: false
      t.boolean :large, default: false

      t.timestamps
    end
  end
end
