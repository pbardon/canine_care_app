class AddSessionTokenIndex < ActiveRecord::Migration[5.0]
  def change
    add_index :users, :session_token
  end
end
