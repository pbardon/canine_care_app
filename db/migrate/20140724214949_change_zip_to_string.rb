class ChangeZipToString < ActiveRecord::Migration[5.0]
  def change
    change_column :sitters, :zipcode, :string
  end
end
