require 'faker'
photos_folder_path=ENV['seed_photo_path']


FactoryBot.define do
  factory :dog do
      user
      name { Faker::Internet.user_name(5..8) }
      age { Faker::Number.number(1) }
      size { %w[small medium large].take(1) }
      description { Faker::Lorem.sentence(1) }
      dog_photo { File.open("#{photos_folder_path}/dog#{rand(1..9)}.jpg") }
  end
end
