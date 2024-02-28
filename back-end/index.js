const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const port = 4000;

app.use(express.json());
app.use(cors());

//-------------------------------------------------------------------------
//Database Connection With MongoDB
mongoose.connect("mongodb+srv://bhaumikkothiya1:bhaumik1910@cluster0.85sbyu3.mongodb.net/E-commerce?retryWrites=true&w=majority");
// mongoose.connect("mongodb+srv://bhaumikkothiya1:bhaumik1910@cluster0.voc6l9s.mongodb.net/E-commerce");


//API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
})

//-------------------------------------------------------------------------
//Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
const upload = multer({ storage: storage })

// Creating upload EndPoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//-------------------------------------------------------------------------
// Schema for Creating  Product s
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    new_price: {
        type: Number,
        require: true,
    },
    old_price: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})
app.post('/addproduct', async (req, res) => {

    //Auto id generated
    let products = await Product.find({}); //pass empty object
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    // console.log(product);
    await product.save();
    // console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//-------------------------------------------------------------------------
// Creating API for deleting Products

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    // console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//-------------------------------------------------------------------------
//Creating API for getting all Products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    // console.log("All Product Fetched");
    res.send(products);
})

//-------------------------------------------------------------------------
//Schema creation For User model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

//Creating EndPoint for Registering the user
app.post('/singup', async (req, res) => {

    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: "existing user found with same email address.." });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    //token
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})

//-------------------------------------------------------------------------
//Creating Endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, error: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, error: "Wrong Email-id" });
    }
})

//-------------------------------------------------------------------------
//Creating EndPoint for new collection data
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    // console.log("New Collection Fetched");
    res.send(newcollection); 
})

//-------------------------------------------------------------------------
//Creating EndPoint for popular in woomen section
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    // console.log("Popular in Women Fetched");
    res.send(popular_in_women);
})

//-------------------------------------------------------------------------
//Creating middleware to fatch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid tokens " })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token.." })
        }
    }
}

//Creating endpoint for adding product in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    // console.log("Added",req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send({success:"Added.."});
}) 

//-------------------------------------------------------------------------
//Creating endpoint for remove product in cartdata
app.post('/removeformcart', fetchUser, async (req, res) => {
    // console.log("remove",req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) 
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send({success:"Remove.."});
})

//-------------------------------------------------------------------------
//creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    // console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

//-------------------------------------------------------------------------
app.listen(port, (error) => {
    if (!error) {
        console.log("👉Server Running on Port => " + port);
    } else {
        console.log("Error " + error);
    }
})