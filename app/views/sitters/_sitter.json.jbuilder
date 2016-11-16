json.(sitter, :id, :user_id, :avg_rating, :sitter_name,
     :description, :price, :small, :medium, :large, :street_address,
     :city, :zipcode, :state, :latitude, :longitude)

json.sitter_photo_small(sitter.sitter_photo.url:small)

json.sitter_photo_large(sitter.sitter_photo.url:big)
