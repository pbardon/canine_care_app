class Photo < ApplicationRecord
  belongs_to :imageable, polymorphic: true

  attr_accessor :photo_contents
  attr_accessor :photo_name

  has_attached_file :img, styles: {
    big: "600x600>",
    small: "100x100#"
    }, default_url: "https://s3-us-west-1.amazonaws.com/pet-sitter-development/pic-missing2.png"
end
