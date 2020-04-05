require 'faker'
photos_folder_path=ENV['SEED_PHOTO_PATH']


FactoryBot.define do
  factory :dog do
      user
      name { Faker::Internet.user_name(specifier: (5..8)) }
      age { Faker::Number.number(digits: 1) }
      size { %w[small medium large].sample }
      description { Faker::Lorem.sentence(word_count: 1) }
      photo
  end
end
