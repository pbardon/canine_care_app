class RemovePaperclipFields < ActiveRecord::Migration[5.2]
    def self.up
      remove_attachment :dogs, :dog_photo
      remove_attachment :sitters, :sitter_photo
    end

    def self.down
      change_table :sitters do |t|
        t.attachment :sitter_photo
      end
      change_table :dogs do |t|
        t.attachment :dog_photo
      end
    end
end
