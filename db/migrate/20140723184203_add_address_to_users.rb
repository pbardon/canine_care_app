class AddAddressToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :street_address, :string
    add_column :users, :city, :string
    add_column :users, :zipcode, :integer
  end
end
