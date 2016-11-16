class AddLatAndLongToSitters < ActiveRecord::Migration
  def change
    add_column :sitters, :latitude, :real
    add_column :sitters, :longitude, :real
  end
end
