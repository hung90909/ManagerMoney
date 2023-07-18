const bodyParser = require('body-parser');
const express = require('express')
const user = require("../model/user")
const loaiCT = require('../model/loaiCT');
const multer = require("multer");
const chiTietCT = require("../model/chiTietCT")
const app = express();
app.use(bodyParser.json())
app.use(express.json())

app.post("/addGiaoDich" ,async (req, res) => {
   try {
     const chiTieu = new chiTietCT(req.body);
     await chiTieu.save();
     res.send("luu thanh cong")
   } catch (error) {
      console.log(error)
   }
})

app.get("/getAllKhoanChi/:id", async (req, res) => {
    try {
        await chiTietCT.find({userID:req.params.id , nameKhoan:"Khoản chi"})
        .then(item => res.json(item))
    } catch (error) {
        console.log(error)
    }
})

app.get("/getAllKhoanThu/:id", async (req, res) => {
    try {
        await chiTietCT.find({userID:req.params.id , nameKhoan:"Khoản thu"})
        .then(item => res.json(item))
    } catch (error) {
        console.log(error)
    }
})
app.get("/getAllGiaoDich/:id", async (req, res) => {
    try {
        await chiTietCT.find({userID: req.params.id })
        .then(item => res.json(item))
    } catch (error) {
        console.log(error)
    }
})

app.get("/deleteGiaoDich/:id",  (req, res)=>{
       try {
          chiTietCT.findByIdAndDelete({_id: req.params.id})
          .then(() => res.send("xoa thanh cong"))
       } catch (error) {
          console.log(error)
       }
})

app.put("/updateGiaoDich/:id" , async (req , res) =>{
   try {
    chiTietCT.findByIdAndUpdate({_id:req.params.id},req.body)
    .then(() => res.send("update thanh cong"))
   } catch (error) {
      console.log(error)
   }
})

module.exports = app