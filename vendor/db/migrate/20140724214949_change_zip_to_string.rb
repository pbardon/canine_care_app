class ChangeZipToString < ActiveRecord::Migration
  def change
    change_column :sitters, :zipcode, :string
  end
end
