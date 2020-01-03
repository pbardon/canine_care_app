namespace :photos do
  task migrate_to_active_storage: :environment do
    Photo.where.not(img_file_name: nil).find_each do |photo|
      image_name = photo.img_file_name
      ext = File.extname(image_name)


      photo_id = photo.id
      if photo_id < 1000
        id_string = "#{photo_id}"
      end
      if photo_id < 100
        id_string = "0#{photo_id}"
      end
      if photo_id < 10
        id_string = "00#{photo_id}"
      end

      img_url = "https://pet-sitter-development.s3.amazonaws.com/photos/imgs/000/000/#{id_string}/original/#{image_name}"

      photo.img.attach(io: open(img_url),
                       filename: image_name,
                       content_type: photo.img_content_type)

    end
  end
end
