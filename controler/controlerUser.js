const bodyParser = require('body-parser');
const express = require('express')
const user = require("../model/user");
const { response } = require('./controlerLoaiCT');
const bcrypt = require('bcryptjs');
const app = express();
app.use(bodyParser.json())
app.use(express.json())

app.post("/inserUser", async (req, res) => {
    try {
        const email = req.body.email;
        const u = await user.findOne({ email: email });
        console.log(u);
        if(u){
            res.status(400).json({ error: "Email đã tồn tại" });
            return;
        }
        const nguoiDung = new user(req.body)
        await nguoiDung.save();
        res.send("them nguoi dung thanh cong")
    } catch (error) {
        console.log(error);
    }
})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const checkEmail = await user.findOne({ email: email })
        if (checkEmail) {
            checkEmail.comparePassword(password, function (err, resulf) {
                if (resulf && !err) {
                    res.json(checkEmail);
                } else {
                    const err = new Error("Tài khoản không đúng !");
                    res.status(404).json({ error: err.message });

                }
            })
        } else {
            const err = new Error("Tài khoản không đúng !");
            res.status(404).json({ error: err.message });
        }
    } catch (error) {
        console.log(error);
    }
})


app.put("/updateMoney/:id", async (req, res) => {
    try {
        await user.findByIdAndUpdate({ _id: req.params.id }, {
            money: req.body.money
        })
        res.send("update thanh cong")
    } catch (error) {
        console.log(error);
    }
})

app.get("/getUser/:id", async (req, res) => {
    try {
        await user.findById({ _id: req.params.id })
            .then(item => res.json(item))
    } catch (error) {
        console.log(error);
    }
})

app.post("/checkEmail",async (req, res) => {
    try {
        const checkEmail = await user.findOne({ email: req.body.email});
        if(checkEmail){
           res.json(checkEmail);
        }else{
            const err = new Error("Email không tồn tại !");
            res.status(404).json({ error: err.message });
        }
    } catch (error) {
        console.log(error);
    }
})

app.put("/ChangePassword/:id",async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await user.findByIdAndUpdate({_id: req.params.id},{password:hashedPassword})
        res.send("change password successfully");
    } catch (error) {
        console.log(error);
    }
})
app.put("/updateMoney/:id", async (req, res) => {
    try {
        console.log(req.body)
        await user.findByIdAndUpdate({ _id: req.params.id }, {
            money: req.body.money
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = app