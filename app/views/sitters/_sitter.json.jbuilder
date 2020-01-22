json.(sitter, :id, :user_id, :avg_rating, :sitter_name,
     :description, :price, :small, :medium, :large, :street_address,
     :city, :zipcode, :state, :latitude, :longitude)

json.sitter_photo_small(sitter.photo && sitter.photo.image ? url_for(sitter.photo.image) : sitter.photo.img_url)

json.sitter_photo_large(sitter.photo && sitter.photo.image ? url_for(sitter.photo.image) : sitter.photo.img_url)
