require 'faker'
FactoryBot.define do
  factory :user do
    name { Faker::Internet.user_name(5..8) }
    email  { Faker::Internet.email(name) }
    password { Faker::Internet.password }
  end
end
