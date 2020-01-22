namespace :photos do
  task cleanup_paperclip: :environment do
    Sitter.where.not(sitter_name: nil).find_each do |sitter|
      if sitter.sitter_photo?
        sitter.sitter_photo.clear
        sitter.save!
      end
    end

    Photo.all.each do |photo|
      if photo.img?
        photo.img.clear
        photo.save!
      end
    end
  end
end
