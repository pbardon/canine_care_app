require 'faker'
FactoryBot.define do
  factory :booking do
      sitter
      dog
      date_start Faker::Date.forward(10)
      date_end Faker::Date.forward(14)
  end
end
