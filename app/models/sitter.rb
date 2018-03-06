class Sitter < ActiveRecord::Base
  validates :user_id, :avg_rating, :sitter_name, :description, :price, presence: true
  validates :street_address, :city, :state, :zipcode, presence: true
  validates :avg_rating, presence: true

  belongs_to :user

  has_many :bookings, dependent: :destroy

  has_many :comments, as: :commentable

  has_attached_file :sitter_photo, styles: {
    big: "600x600>",
    small: "100x100#"
  }, default_url: "https://s3-us-west-1.amazonaws.com/pet-sitter-development/pic-missing2.png"

  validates_attachment :sitter_photo,
  :content_type => { :content_type => [ "image/jpeg", "image/gif", "image/png" ] }
end
