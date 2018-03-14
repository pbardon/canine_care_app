class Dog < ActiveRecord::Base
  validates :name, :age, :size, :description, :owner_id, presence: true
  # validates :size, inclusion: { in: %w(small, medium, large) }

  belongs_to :owner, class_name: :User, foreign_key: :owner_id

  has_many :bookings, dependent: :destroy

  has_many :comments, as: :commentable

  has_attached_file :dog_photo, styles: {
    big: "600x600>",
    small: "100x100#"
  }, default_url: "https://s3-us-west-1.amazonaws.com/pet-sitter-development/pic-missing2.png"


  validates_attachment :dog_photo,
  :content_type => { :content_type => ["image/jpeg", "image/gif", "image/png"] }

end
