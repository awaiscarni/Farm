const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
  console.log("Mongo Connection Open!!!")
})
.catch(err =>{
  console.log("On no Mongo Connection Error!!")
  console.log(err)
})

// const p = new Product({
//     name:'Ruby Grapefruit',
//     price: 1.99,
//     category:'fruit'
// })
// p.save()
//     .then(p =>{
//     console.log(p)
//     })
//     .catch(e =>{
//         console.log(e)
//     })

const seedProducts = [
    {
        name:'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name:'Organic Godddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name:'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name:'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name:'Choclate Whole Milk',
        price: 2.69,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res =>{
        console.log(res)
    })
    .catch(e =>{
        console.log(e)
    })