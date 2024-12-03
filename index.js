const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const Product = require('./models/product');
const Farm = require('./models/farm');
const categories = ['fruit','vegitables','dairy'];

mongoose.connect('mongodb://127.0.0.1:27017/farmStand2',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
  console.log("Mongo Connection Open!!!")
})
.catch(err =>{
  console.log("On no Mongo Connection Error!!")
  console.log(err)
});


app.set('views' , path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'views')));

//farm
app.get('/farm',async(req,res)=>{
    const farms = await Farm.find({});
    res.render('./products/farmIndex', {farms});
})

app.get('/farm/new',(req,res)=>{
    res.render('./products/newFarm')
})

app.get('/farm/:id', async(req,res)=>{
    const farm= await Farm.findById(req.params.id).populate('products');
    res.render('./products/farmShow',{farm});
})


app.delete('/farm/:id', async(req,res) =>{
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farm')
})

app.post('/farm', async(req,res)=>{
    const newFarm = new Farm(req.body);
    await newFarm.save();
    res.redirect('/farm');
})


app.get('/farm/:id/products/new',async (req,res) =>{
    const {id} = req.params;
    const farm =await Farm.findById(id);
    res.render('./products/new',{categories,farm})
})

app.post('/farm/:id/products',async (req,res) =>{
    const {id} = req.params;
    const farm = await Farm.findById(id);
    const {name ,price , category} = req.body;
    const product = new Product({name,price,category});
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farm/${id}`)
})







//Product
app.get('/products', async(req,res) =>{
    const {category} = req.query;
    if(category){
        const products = await Product.find({category})
        res.render('./products/index',{products,category})
    }else{
        const products = await Product.find({})
        res.render('./products/index',{products , category:'ALL'})
    }
})

app.get('/products/new',(req,res)=>{
    res.render('./products/new')
})

app.post('/products',async(req,res) =>{
    const newProduct= new Product(req.body);
    await newProduct.save();
    res.redirect(`./products/${newProduct._id}`)
})

app.get('/products/:id/edit',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('./products/edit',{product})
})

app.get('/products/:id' , async (req,res) =>{
    const {id} = req.params;
    const product= await Product.findById(id).populate('farm','name');
    res.render('./products/show',{product})
})

app.put('/products/:id', async(req,res) =>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body , {runValidators:true , new:true});
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req , res) =>{
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
app.listen(3000 , () =>{
    console.log('APP IS LISTENING ON PORT 3000!!!')
})