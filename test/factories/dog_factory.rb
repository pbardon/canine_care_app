require 'faker'
require_relative './factory_helper'

FactoryBot.define do
  factory :dog do
      user
      name { Faker::Internet.username() }
      age { Faker::Number.number(digits: 1) }
      size { %w(small, medium, large).take(1) }
      description { Faker::Lorem.sentence(word_count: 1) }
      photo
  end
end
