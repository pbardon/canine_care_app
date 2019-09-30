class Dog < ActiveRecord::Base
	validates :name, :age, :size, :description, presence: true
	# validates :size, inclusion: { in: %w(small, medium, large) }

	belongs_to :user

	has_many :bookings, dependent: :destroy

	has_many :comments, as: :commentable

	has_attached_file :dog_photo, styles: {
	big: "600x600>",
	small: "100x100#"
	}, default_url: "https://s3-us-west-1.amazonaws.com/pet-sitter-development/pic-missing2.png"


	has_one :photo, as: :imageable

	accepts_nested_attributes_for :photo

	:content_type => { :content_type => ["image/jpeg", "image/gif", "image/png"] }
end
