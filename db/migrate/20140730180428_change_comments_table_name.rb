class ChangeCommentsTableName < ActiveRecord::Migration[5.0]
  def change
    rename_table :sitter_comments, :comments
  end
end
