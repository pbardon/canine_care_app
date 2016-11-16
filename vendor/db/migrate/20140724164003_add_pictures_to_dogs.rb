class AddPicturesToDogs < ActiveRecord::Migration
  def self.up
    change_table :dogs do |t|
      t.attachment :dog_photo
    end
  end

  def self.down
    drop_attached_file :dogs, :dog_photo
  end
end
