class ChangeCommentsToContent < ActiveRecord::Migration[5.0]
  def change
    rename_column :comments, :comment, :content
  end
end
