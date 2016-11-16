class CreateSitterComments < ActiveRecord::Migration
  def change
    create_table :sitter_comments do |t|
      t.integer :sitter_id, null: false
      t.integer :user_id, null: false
      t.text :comment
      t.date :comment_date, null: false

      t.timestamps
    end

    add_column :sitter_comments, :rating, :real

    change_column :sitters, :avg_rating, 'real USING CAST(avg_rating AS real)'
    change_column :dogs, :avg_rating, 'real USING CAST(avg_rating AS real)'

    add_index :sitter_comments, :sitter_id
    add_index :sitter_comments, :user_id
  end
end
