require 'faker'

photos_folder_path=ENV['SEED_PHOTO_PATH']

FactoryBot.define do
    factory :photo do
        img { File.open("#{photos_folder_path}/sitter#{rand(1..9)}.jpg") }
    end
end
