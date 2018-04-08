# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

photos_folder_path="/Users/bardon/Desktop/seedphotos"
require 'factory_bot'
include FactoryBot::Syntax::Methods

FactoryBot.find_definitions

# clear all users and sitters before seeding...
Sitter.all.each {|s| s.destroy}
User.all.each {|s| s.destroy}


100.times do
    create(:sitter)
end

create(:sitter)

#
#
# sitters = Sitter.create([
#   {user_id: 1,
#   sitter_name: "Professional Dog Care",
#   description: "Hello fellow dog lovers. Is the health and happiness of your dog paramount to you when choosing a dog boarder? If so, then look no further! Giddyup Pup is owned and operated by my boyfriend Michael and myself. We are both certified dog walkers who are trained in pet CPR and first aid. Also we are insured through Pet Sitter and Associates. Rest assured your pet will be in excellent care with Giddyup Pup.",
#   small: true,
#   medium: true,
#   large: true,
#   price: 25,
#   street_address: "33 Frankfort St",
#   city: "Daly City",
#   state: "CA",
#   zipcode: "94014",
#   sitter_photo: File.open("#{photos_folder_path}/sitter1.jpg")
#   },
#
#   {user_id: 2,
#   sitter_name: "I welcome your doggies into my home!",
#   description: "Located in a beautiful victorian house with a large backyard, our home welcomes your dog(s). In choosing our services your dog will recieve 3 walks a day with a variety of choices such as visiting a dog park and getting to socialize with other dogs or going on a private hike, taking a stroll around the neighborhood or on a warm day going down to the beach!",
#   small: true,
#   medium: true,
#   large: true,
#   price: 30,
#   street_address: "699 St Francis St",
#   city: "Redwood City",
#   state: "CA",
#   zipcode: "94061",
#   sitter_photo: File.open("#{photos_folder_path}/sitter2.jpg")
#   },
#
#   {user_id: 3,
#   sitter_name: "Your dog will be well cared for!",
#   description: "I am a huge dog-lover and have been dog-sitting for friends and family my entire life. Two dogs I sit for often are Nanni (Golden Retriever) and Max (Great Dane). I have a huge soft-spot in my heart for animals and dogs top the list! I couldn't imagine life without them and I live close to both Duboce (Dog) Park and Golden Gate Part where I can walk and run with any type of dog!",
#   small: true,
#   medium: true,
#   large: true,
#   price: 40,
#   street_address: "11180 Sanchez St",
#   city: "Castroville",
#   state: "CA",
#   zipcode: "95012",
#   sitter_photo: File.open("#{photos_folder_path}/sitter3.jpg")
#   },
#
#   {user_id: 4,
#   sitter_name: "A Loving Home for Your Dog!",
#   description: "Two lifelong dog lovers who moved up to SF a year ago. We miss having a dog in the home. My boyfriend and I have cared for dogs all our lives, and we will be sure to give your pup the utmost care and attention. We've had the best experience with the dogs we've cared for and hope to continue to dogsit in our spare time.",
#   small: true,
#   medium: true,
#   large: true,
#   price: 50,
#   street_address: "73 Jensen Rd",
#   city: "Gustine",
#   state: "CA",
#   zipcode: "95322",
#   sitter_photo: File.open("#{photos_folder_path}/sitter4.jpg")
#   },
#
#   {user_id: 5,
#   sitter_name: "Professional Dog Care",
#   description: "I live in a dog friendly home in the Castro/Duboce Triangle close to many dog parks and dog-friendly destinations. My household consists of 3 amazing roommates, all of whom love canine company. In fact, dogs are a hot commodity in our household, and tend to get a bit spoiled with attention, love and lots of cuddles.",
#   small: true,
#   medium: true,
#   large: true,
#   price: 25,
#   street_address: "39401 Fremont Blvd",
#   city: "Fremont",
#   state: "CA",
#   zipcode: "94538",
#   sitter_photo: File.open("#{photos_folder_path}/sitter5.jpg")
#   },
#
#   {user_id: 6,
#   sitter_name: "Avid animal lover happy to help out!",
#   description: "Hi! My name is Brian and I'd love to spoil your dog while you're away. I've always had dogs around since I can remember and I know how extremely important your little guy is to you. I live in a very comfortable studio which is perfect for resting & relaxing between play sessions.",
#   small: true,
#   medium: true,
#   large: true,
#   price: 20,
#   street_address: "34 Tapia Dr",
#   city: "San Francisco",
#   state: "CA",
#   zipcode: "94132",
#   sitter_photo: File.open("#{photos_folder_path}/sitter6.jpg")
#   },
#
#   {user_id: 7,
#   sitter_name: "Doggiebnb with 24/7 care!",
#   description: "I am a stay-at-home mom who adores dogs. I would love to take your dog into our home when you need someone to care for and love your furry family member. I love to play with and give lots of cuddles and back scratches to pooches. I have had many dogs of my own, and will follow any behavioral instructions that you implement in your own home. I have a back yard area, and live two blocks from a wonderful dog park.",
#   small: true,
#   medium: true,
#   large: true,
#   price: 25,
#   street_address: "500 Douglass St",
#   city: "San Francisco",
#   state: "CA",
#   zipcode: "94114",
#   sitter_photo: File.open("#{photos_folder_path}/sitter7.jpg")
#   },
#
#   {user_id: 8,
#   sitter_name: "Let your dog go on vaction too!",
#   description: "I've been a doglover since childhood and my current dog who I fostered then adopted is a 4 year old terrier mix named Morty. He's a certified therapy dog and we visit senior centers monthly. Morty is well trained but has his terrier moments. We love to go for long walks and hang out in the park.",
#   small: true,
#   medium: true,
#   large: true,
#   price: 60,
#   street_address: "900 Southdown Ct",
#   city: "Winters",
#   state: "CA",
#   zipcode: "94596",
#   sitter_photo: File.open("#{photos_folder_path}/sitter8.jpg")
#   },
#
#   {user_id: 9,
#   sitter_name: "Your per will have a great time with us!",
#   description: "I have two dogs named Fergie and Nacho. They have their own backyard (rare in the city), a center courtyard, and their own room! I can arrange for daily walks. I am a dog lover so the dogs get a lot of attention!",
#   small: true,
#   medium: true,
#   large: true,
#   price: 35,
#   street_address: "2701 Bodega Ave",
#   city: "Petaluma",
#   state: "CA",
#   zipcode: "94952",
#   sitter_photo: File.open("#{photos_folder_path}/sitter9.jpg")
#   },
#
#   {user_id: 10,
#   sitter_name: "Perfect home away from home",
#   description: "Dog lover here with a beautiful studio apartment located in Russian Hill! This is the perfect loving home fit for a fury friends stay-cation in SF. Located minutes from Fort Mason, Aquatic Park & Marina Green your dog will be sure to have endless hours of outdoor fun.",
#   small: true,
#   medium: true,
#   large: true,
#   price: 25,
#   street_address: "212 Madrone St",
#   city: "Vacaville",
#   state: "CA",
#   zipcode: "95688",
#   sitter_photo: File.open("#{photos_folder_path}/sitter10.jpg")
#   },
#
#   {user_id: 11,
#   sitter_name: "My Home is Your Dog's Home!",
#   description: "Would you like your furry family member to stay with someone who loves dogs and loves nice long walks? If you answered yes then I'm the dog sitter for you! I have my own dog called toffee who is a Labrador and just loves making friends. We go on many walks throughout the day and he gets spoiled rotten!",
#   small: true,
#   medium: true,
#   large: true,
#   price: 20,
#   street_address: "41 Gregory Ln",
#   city: "Pleasant Hill",
#   state: "CA",
#   zipcode: "94523",
#   sitter_photo: File.open("#{photos_folder_path}/sitter11.jpg")
#   },
#
#   {user_id: 12,
#   sitter_name: "Your Dog Will Receive Tons of Love and Attention",
#   description: "I am a huge dog lover. I grew up with dogs all my life and miss having one. During the week, I am out of the house for ~12 hours at a time, and I just wouldn't be able to put a pet through those long hours alone. Otherwise, I would definitely get a dog myself! I live by myself, and my apartment (~1,000 square feet) is dog-friendly and a good space for a small or medium dog to hang out with a new friend (me) for a night.",
#   small: true,
#   medium: true,
#   large: true,
#   price: 25,
#   street_address: "1001 Everglades Dr",
#   city: "Pacifica",
#   state: "CA",
#   zipcode: "94044",
#   sitter_photo: File.open("#{photos_folder_path}/sitter12.jpg")
#   },
#
#   {user_id: 13,
#   sitter_name: "Dog Vacation with Yard and a Social Dog",
#   description: "Small, three-level home with three related animal-loving adults. I will walk one or two other dogs along with our family dog, Eddie, twice a day for an hour. Eddie weighs twenty pounds and is about ten years old. He's friendly but doesn't play with other dogs.",
#   small: true,
#   medium: true,
#   large: true,
#   price: 40,
#   street_address: "3900 Quintara St",
#   city: "San Francisco",
#   state: "CA",
#   zipcode: "94116",
#   sitter_photo: File.open("#{photos_folder_path}/sitter13.jpg")
#   },
#
#   {user_id: 14,
#   sitter_name: "Dog Solution",
#   description: "I have a spacious home and backyard with outdoor access all day! My sweet bichon, Charlie, loves to play and would welcome a new friend. I have been a dog owner all my life. I am a credentialed teacher and a responsible, caring person.",
#   small: true,
#   medium: true,
#   large: true,
#   price: 25,
#   street_address: "445 El Camino Del Mar",
#   city: "San Francisco",
#   state: "CA",
#   zipcode: "94121",
#   sitter_photo: File.open("#{photos_folder_path}/sitter14.jpg")
#   },
#
#   {user_id: 15,
#   price: 25,
#   sitter_name: "Happy dog = happy parents",
#   description: "I live in a dog friendly apartment building that is perfect for small dogs. I'm also 1 block from Golden Gate Park which is fantastic for long walks, dog parks, and lots of sniffing. I currently dog-sit/dog-walk for my friends dogs and love it so much that I want to open my home for others.",
#   small: true,
#   medium: true,
#   large: true,
#   street_address: "3402 Clay St",
#   city: "San Francisco",
#   state: "CA",
#   zipcode: "94118",
#   sitter_photo: File.open("#{photos_folder_path}/sitter15.jpg")
#   }
#
# ])
