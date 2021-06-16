class AddImgToPhotos < ActiveRecord::Migration[5.0]
  def self.up
    change_table :photos do |t|
      # Remove paperclip methods from migration
      # t.attachment :img
    end
  end
  def self.down
    # Remove paperclip methods from migration
    # drop_attached_file :photos, :img
  end
end
