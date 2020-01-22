namespace :photos do
  task cleanup_paperclip: :environment do
    Sitter.where.not(sitter_photo: nil).find_each do |sitter|
      sitter.sitter_photo.destroy!
    end
  end
end
