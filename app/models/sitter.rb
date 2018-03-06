class Sitter < ActiveRecord::Base

    before_save :generate_geocode

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

  def generate_geocode
    coords = []
    address = self.street_address.to_s + ", " + self.city.to_s + ", " + self.state.to_s + " " + self.zipcode.to_s

    geolocationaddress = Addressable::URI.new(
      scheme: 'https',
      host: 'maps.googleapis.com',
      path: 'maps/api/geocode/json',
      query_values: {address: address, key: ENV['MAPS_API_KEY']}
    ).to_s

    output = JSON.parse(RestClient.get(geolocationaddress))
    results = output["results"].first
    location = results['geometry']['location']
    location

    self.latitude = location['lat']
    self.longitude = location['lng']
  end
end
