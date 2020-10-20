# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

items= Item.create([
  { 
    name: "とりにく",
    image_url: "/assets/4345731.jpg"
  }, 
  { 
    name: "かわいい猫",
    image_url: "/assets/neko_image-1024x856.jpg"
  },
  { 
    name: "緑の景色",
    image_url: "/assets/OGA1IP0.jpg" 
  }, 
  { 
    name: "さかさま",
    image_url: "/assets/upsidedown_cat.jpg" 
  }, 
])

reviews = Review.create([
  {
    title: 'とてもよい！',
    description: 'とてもよかったです',
    score: 5,
    item: items.first
  },
  {
    title: 'よくなかった',
    description: 'あまりよくなかったです',
    score: 1,
    item: items.first
  }
])