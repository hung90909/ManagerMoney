const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const loaiCT = new Schema({
    image:String,
    name:String,
    nameKhoan:String,
    userID:String,
})

module.exports = mongoose.model("loaiCT",loaiCT);