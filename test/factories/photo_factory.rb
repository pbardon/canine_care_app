require 'faker'
FactoryBot.define do
  factory :photo do
    photo_name { Faker::Internet.username }
    photo_contents  { "data:image/jpeg;base64,#{Base64.encode64(File.open("/Users/oldComputer/Desktop/seedphotos/dog1.jpeg", "rb").read)}" }
  end
end
