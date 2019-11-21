class AddImageableToTables < ActiveRecord::Migration[5.2]
  def change
    add_column :dogs, :imageable_id, :integer

    add_column :sitters, :imageable_id, :integer

  end
end
