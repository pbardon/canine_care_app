class Photo < ActiveRecord::Base
  include Rails.application.routes.url_helpers

  belongs_to :imageable, polymorphic: true

  # New ActiveStorage declaration
  has_one_attached :img

  #
  # has_attached_file :img, styles: {
  #   big: "600x600>",
  #   small: "100x100#"
  #   }, default_url: "https://s3-us-west-1.amazonaws.com/pet-sitter-development/pic-missing2.png"
  #
  # validates_attachment :img,
  #   content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }

  def img_url
   #generate url for attachement
   return rails_blob_path(self.img, disposition: "attachment")
  end

end
