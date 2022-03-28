# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all 

10.times do
  name = Faker::Name.name
  age = Faker::Number.number(digits: 2)
  location = Faker::Nation.capital_city #=> "Kathmandu"
  avatar = Faker::Avatar.image(slug: name, size: "50x50", format: "jpg", set: 'set4')
  Friend.create(name: name, age: age, location: location, avatar: avatar)
end 

u1 = User.create(email:'test1@test.com', password:123456, liked_friends:[1,2,3])
u2 = User.create(email:'test2@test.com', password:123456, liked_friends:[3,4,6])

