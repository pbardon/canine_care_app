class Dog < ActiveRecord::Base
  validates :name, :age, :size, :description, presence: true
  # validates :size, inclusion: { in: %w(small, medium, large) }

  belongs_to :user

  has_many :bookings, dependent: :destroy

  has_many :comments, as: :commentable

  has_one :photo, as: :imageable

  accepts_nested_attributes_for :photo

end
