require 'faker'

photos_folder_path=ENV['SEED_PHOTO_PATH']

FactoryBot.define do
    factory :sitter do
        user
        sitter_name { Faker::Company.catch_phrase }
        description { Faker::Lorem.paragraph(2) }
        price { Faker::Number.number(2) }
        street_address { Faker::Address.street_address }
        city { Faker::Address.city }
        state { Faker::Address.state }
        zipcode { Faker::Address.zip_code }
        avg_rating { 0 }
        latitude { rand(31..49) }
        longitude { rand(-120..-81) }
        sitter_photo { File.open("#{photos_folder_path}/sitter#{rand(1..9)}.jpg") }
    end
end
