class Rename < ActiveRecord::Migration[5.0]
  def change
    rename_column :dogs, :owner_id, :user_id
  end
end
