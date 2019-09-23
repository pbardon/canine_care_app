require_relative './factory_helper'
require 'faker'
FactoryBot.define do
  factory :photo do
    photo_name { Faker::Internet.username }
    photo_contents  { generate_base64_encoded_image }
  end
end
