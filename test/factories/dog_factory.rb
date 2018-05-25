require 'faker'
FactoryBot.define do
  factory :dog do
      user
      name Faker::Internet.user_name(5..8)
      age Faker::Number.number(1)
      size %w(small, medium, large).take(1)
      description Faker::Lorem.sentence(1)
  end
end
