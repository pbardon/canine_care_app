json.(dog, :id, :name, :age, :size, :description, :user_id, :avg_rating)

json.dog_photo_small(dog.photo ? dog.photo.img_url : dog.dog_photo.url:small)

json.dog_photo_small(dog.photo ? dog.photo.img_url : dog.dog_photo.url:large)
