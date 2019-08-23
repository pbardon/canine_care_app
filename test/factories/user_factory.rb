require 'faker'
FactoryBot.define do
  factory :user do
    name { Faker::Internet.username(specifier: 5..8) }
    email  { Faker::Internet.email(name: name) }
    password { Faker::Internet.password }
  end
end
