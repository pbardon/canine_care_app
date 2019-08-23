class Dog < ActiveRecord::Base
  validates :name, :age, :size, :description, presence: true
  # validates :size, inclusion: { in: %w(small, medium, large) }

  belongs_to :user

  has_many :bookings, dependent: :destroy

  has_many :comments, as: :commentable

  has_many :photos, as: :imageable

  # has_one_attached :dog_photo

  # def save()
  #   self.dog_photo.attach(photo)
  #   params[:signed_blob_id]
  #   return super
  # end

  before_create :process_dog

  def process_dog
    # binding.pry
  end

end
