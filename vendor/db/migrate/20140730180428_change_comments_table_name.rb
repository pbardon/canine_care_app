class ChangeCommentsTableName < ActiveRecord::Migration
  def change
    rename_table :sitter_comments, :comments
  end
end
