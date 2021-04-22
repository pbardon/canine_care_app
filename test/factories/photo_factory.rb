require 'faker'

photos_folder_path=ENV['SEED_PHOTO_PATH']

FactoryBot.define do
  factory :photo do
      transient do
         after :build do |photo, evaluator|
           file = File.open("#{photos_folder_path}/sitter#{Random.rand(1..9)}.jpg")
           filename = File.basename(file)
           photo.img.attach(
             io: file,
             filename: filename
           )
         end
       end
    end
end
