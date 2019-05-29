class AddLatAndLongToSitters < ActiveRecord::Migration[5.0]
  def change
    add_column :sitters, :latitude, :real
    add_column :sitters, :longitude, :real
  end
end
