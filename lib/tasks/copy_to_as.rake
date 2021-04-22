namespace :photos do
  task migrate_to_active_storage: :environment do
    Photo.where.not(img_file_name: nil).find_each do |photo|
      # This step helps us catch any attachments we might have uploaded that
      # don't have an explicit file extension in the filename
      image = photo.img_file_name
      ext = File.extname(image)

      id = "%03d" % (photo.id)

      # this url pattern can be changed to reflect whatever service you use
      img_url = "https://pet-sitter-development.s3.amazonaws.com/photos/imgs/000/000/#{id}/original/#{image}"

      photo.img.attach(io: open(img_url),
                       filename: photo.img_file_name,
                       content_type: photo.img_content_type)

      photo.save!
    end
  end
end
