namespace :sitters do
  desc "migrate photos to active storage"
  task migrate_to_active_storage: :environment do
    Sitter.where.not(sitter_photo_file_name: nil).find_each do |sitter|
      # create blank photo record
      sitter.create_photo({ photo_name: sitter.sitter_photo_file_name })
      # attach the image from paperclip to active storage
      sitter.photo.img.attach(io: open(sitter.sitter_photo.url), 
                              filename: sitter.sitter_photo_file_name, 
                              content_type: sitter.sitter_photo_content_type)

      sitter.save!
    end
  end
end
