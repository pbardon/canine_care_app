class CreateDogs < ActiveRecord::Migration[5.0]
  def change
    create_table :dogs do |t|
      t.string :name, null: false
      t.string :size, null: false
      t.text :description, null: false
      t.integer :age, null: false
      t.integer :avg_rating, default: 0
      t.integer :owner_id, null: false

      t.timestamps
    end

    add_index :dogs, :name
    add_index :dogs, :owner_id
  end
end
