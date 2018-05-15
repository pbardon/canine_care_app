class Rename < ActiveRecord::Migration
  def change
    rename_column :dogs, :owner_id, :user_id
  end
end
