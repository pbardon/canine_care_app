# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


users= User.create([{
  name: "Julienne R. Hanks",
  email: "demo1@mail.com",
  password: "password"
  },

  {
  name: "Carl F. Gloss",
  email: "demo2@mail.com",
  password: "password"
  },

  {
  name: "Dolores J. Walker",
  email: "DoloresJWalker@dayrep.com",
  password: "password"
  },

  {
  name: "Esther R. Barratt",
  email: "EstherRBarratt@dayrep.com",
  password: "password"
  },

  {
  name: "Jim Lahey",
  email: "JulienneRHanks@dayrep.com",
  password: "liquor"
  },

  {
  name: "Carl P. Barrett",
  email: "CarlPBarrett@jourrapide.com",
  password: "password"
  },

  {
  name: "Jeremy L. Bennett",
  email: "JeremyLBennett@armyspy.com",
  password: "password"
  },

  {
  name: "Kimberly C. Krebs",
  email: "KimberlyCKrebs@jourrapide.com",
  password: "password"
  },

  {
  name: "Eboni E. Hall",
  email: "EboniEHall@armyspy.com",
  password: "password"
  },

  {
  name: "Michael S. Grant",
  email: "MichaelSGrant@dayrep.com",
  password: "password"
  },

  {
  name: "Alan W. Ito",
  email: "AlanWIto@dayrep.com",
  password: "password"
  },

  {
  name: "Linda R. Coon",
  email: "LindaRCoon@armyspy.com",
  password: "password"
  },

  {
  name: "Sara A. Waddy",
  email: "SaraAWaddy@teleworm.us",
  password: "password"
  },

  {
  name: "Jerry C. Cooper",
  email: "JerryCCooper@rhyta.com",
  password: "password"
  },

  {
  name: "Opal J. Cowan",
  email: "OpalJCowan@teleworm.us",
  password: "password"
  },


])
#
# dogs = Dog.create([
#   { owner_id: 1,
#     name: 'Spot',
#     age: 2,
#     description: "The domestic dog is a member of the Canidae family of the mammalian order Carnivora. The term domestic dog is generally used for both domesticated and feral varieties. The dog was the first domesticated animal[4][5] and has been the most widely kept working, hunting, and pet animal in human history.",
#     dog_photo: File.open("/Users/oldComputer/Desktop/seedphotos/dog1.jpg")
#   },
#
#   { owner_id: 1,
#     name: 'Dubs',
#     age: 2,
#     description: "Most breeds of dog are at most a few hundred years old, having been artificially selected for particular morphologies and behaviors by people for specific functional roles. Through this selective breeding, the dog has developed into hundreds of varied breeds, and shows more behavioral and morphological variation than any other land mammal.",
#     dog_photo: File.open("/Users/oldComputer/Desktop/seedphotos/dog2.jpg")
#   },
#
#   { owner_id: 1,
#     name: 'Lassie',
#     age: 2,
#     description: "Lassie is a fictional female collie dog character created by Eric Knight in a short story expanded to novel length called Lassie Come-Home. However, Knight may have been influenced by another female collie named Lassie, featured in the 1859 story The Half-brothers written by British writer Elizabeth Gaskell.",
#     dog_photo: File.open("/Users/oldComputer/Desktop/seedphotos/dog3.jpg")
#   },
#
#   { owner_id: 1,
#     name: 'Bear',
#     age: '2',
#     description: "Recent studies of well-preserved remains of a dog-like canid from the Razboinichya Cave in the Altai Mountains of southern Siberia concluded that a particular instance of early wolf domestication approximately 33,000 years ago did not result in modern dog lineages, possibly because of climate disruption during the Last Glacial Maximum.[4][7] The authors postulate that at least several such incipient events have occurred. A study of fossil dogs and wolves in Belgium, Ukraine, and Russia tentatively dates domestication from 14,000 years ago to more than 31,700 years ago.",
#     dog_photo: File.open("/Users/oldComputer/Desktop/seedphotos/dog4.jpg")
#   },
#
#   { owner_id: 1,
#     name: 'Spot',
#     age: 2,
#     description: "Domestic dogs inherited complex behaviors from their wolf ancestors, which would have been pack hunters with complex body language. These sophisticated forms of social cognition and communication may account for their trainability, playfulness, and ability to fit into human households and social situations, and these attributes have given dogs a relationship with humans that has enabled them to become one of the most successful species on the planet today.",
#     dog_photo: File.open("/Users/oldComputer/Desktop/seedphotos/dog5.jpg")
#   },
#
#   { owner_id: 2,
#     name: 'Shiba',
#     age: 2,
#     description: "Although dogs have been the subject of a great deal of behaviorist psychology (e.g. Pavlov's dog), they do not enter the world with a psychological 'blank slate' Rather, dog behavior is affected by genetic factors as well as environmental factors. Domestic dogs exhibit a number of behaviors and predispositions that were inherited from wolves.",
#     dog_photo: File.open("/Users/oldComputer/Desktop/seedphotos/dog6.jpg")
#   },
#
#   { owner_id: 1,
#     name: 'Loki',
#     age: 2,
#     description: "Dogs can also learn by mimicking human behaviors. In one study, puppies were presented with a box, and shown that, when a handler pressed a lever, a ball would roll out of the box. The handler then allowed the puppy to play with the ball, making it an intrinsic reward. The pups were then allowed to interact with the box. Roughly three quarters of the puppies subsequently touched the lever, and over half successfully released the ball, compared to only 6% in a control group that did not watch the human manipulate the lever.",
#     dog_photo: File.open("/Users/oldComputer/Desktop/seedphotos/dog7.jpg")
#   },
#
#   { owner_id: 1,
#     name: 'Maddie',
#     age: 2,
#     description: "A new study in Budapest, Hungary, has found that dogs are able to tell how big another dog is just by listening to its growl. A specific growl is used by dogs to protect their food. The research also shows that dogs do not lie about their size, and this is the first time research has shown animals can determine anothers size by the sound it makes.",
#     dog_photo: File.open("/Users/oldComputer/Desktop/seedphotos/dog8.jpg")
#   }
#
# ])
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter1.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter2.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter3.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter4.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter5.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter6.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter7.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter8.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter9.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter10.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter11.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter12.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter13.jpg")
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
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter14.jpg")
#   },
#
#   {user_id: 15,
#   sitter_name: "Happy dog = happy parents",
#   description: "I live in a dog friendly apartment building that is perfect for small dogs. I'm also 1 block from Golden Gate Park which is fantastic for long walks, dog parks, and lots of sniffing. I currently dog-sit/dog-walk for my friends dogs and love it so much that I want to open my home for others.",
#   small: true,
#   medium: true,
#   large: true,
#   street_address: "3402 Clay St",
#   city: "San Francisco",
#   state: "CA",
#   zipcode: "94118",
#   sitter_photo: File.open("/Users/oldComputer/Desktop/seedphotos/sitter15.jpg")
#   }
# 
# ])
