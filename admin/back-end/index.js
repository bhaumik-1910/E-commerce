const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// const path = require("path");
const cors = require("cors");
const port = 3001;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://bhaumikkothiya1:bhaumik1910@cluster0.85sbyu3.mongodb.net/E-commerce-Admin?retryWrites=true&w=majority");

app.get("/", (req, res) => {
    res.send("Express App is Running");
})

//Schema creation For Admin model
const Admin = mongoose.model('Admin', {
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
    date: {
        type: Date,
        default: Date.now,
    },
})

//Creating EndPoint for Registering the adnin
app.post('/singup', async (req, res) => {

    let check = await Admin.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: "existing admin found with same email address.." });
    }

    const admin = new Admin({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    await admin.save();

    const data = {
        admin: {
            id: admin.id
        }
    }

    //token
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})

//-------------------------------------------------------------------------
//Creating Endpoint for admin login
app.post('/login', async (req, res) => {
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
        const passCompare = req.body.password === admin.password;
        if (passCompare) {
            const data = {
                admin: {
                    id: admin.id
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


app.listen(port, (error) => {
    if (!error) {
        console.log("👉Server Running on Port => " + port);
    } else {
        console.log("Error " + error);
    }
})