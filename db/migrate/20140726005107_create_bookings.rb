class CreateBookings < ActiveRecord::Migration
  def change
    create_table :bookings do |t|
      t.integer :sitter_id, null: false
      t.integer :dog_id, null: false
      
      t.date :date_start, null: false
      t.date :date_end, null: false

      t.boolean :confirmed, default: false
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
