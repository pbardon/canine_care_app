class MoveAddressToSitter < ActiveRecord::Migration
  def change
    remove_column :users, :street_address
    remove_column :users, :city
    remove_column :users, :zipcode
    remove_column :users, :state

    add_column :sitters, :street_address, :string
    add_column :sitters, :city, :string
    add_column :sitters, :zipcode, :integer
    add_column :sitters, :state, :string
  end
end
