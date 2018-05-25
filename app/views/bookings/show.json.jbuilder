json.(@booking, :id, :date_start, :date_end, :dog_id, :sitter_id, :message, :confirmed, :completed)

json.dog do
  json.extract!(@booking.dog, :id, :name, :age, :size, :description, :user_id, :avg_rating, :dog_photo)
end
