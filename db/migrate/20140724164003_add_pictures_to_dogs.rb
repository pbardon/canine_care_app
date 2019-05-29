class AddPicturesToDogs < ActiveRecord::Migration[5.0]
  def self.up
    change_table :dogs do |t|
      t.attachment :dog_photo
    end
  end

  def self.down
    drop_attached_file :dogs, :dog_photo
  end
end
