namespace :db do
  task copy_to_photo_model: :environment do
    Sitter.all.each do |sitter|
      begin
        photo = sitter.sitter_photo
        if photo
          sitter.create_photo({ img: photo })
          unless sitter.save!
            puts "Failed to save #{sitter.user_name}"
          end
        end
      rescue StandardError => err
        puts "Hit the following error: #{err.message}, for sitter: #{sitter.sitter_name}"
      end
    end
  end

  task :destroy_old_photos do
    Sitter.all.each do |sitter|
      sitter.sitter_photo.clear
      unless sitter.save!
        puts "Failed to delete photo for #{sitter.user_name}"
      end
    end
  end
end
