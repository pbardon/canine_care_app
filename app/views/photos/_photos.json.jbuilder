json.extract! photo, :id, :imageable_type, :imageable_id, :created_at
json.url rails_blob_url(photo.img)