class AddAttachmentToSitters < ActiveRecord::Migration
  def self.up
    change_table :sitters do |t|
      t.attachment :sitter_photo
    end
  end
  def self.down
    drop_attached_file :sitters, :sitter_photo
  end
end
