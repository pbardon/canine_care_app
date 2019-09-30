class Photo < ActiveRecord::Base
  belongs_to :imageable, polymorphic: true

  # attr_accessor :photo_contents
  # attr_accessor :photo_name
  # attr_accessor :img_file_name

  has_attached_file :img, styles: {
    big: "600x600>",
    small: "100x100#"
    }, default_url: "https://s3-us-west-1.amazonaws.com/pet-sitter-development/pic-missing2.png"

  validates_attachment :img,
    content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }

end
