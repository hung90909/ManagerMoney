const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chiTietCT = new Schema({
    image:String,
    name:String,
    nameKhoan:String,
    userID:String,
    loaiCT_ID:String,
    soTien:Number,
    ghiChu:String,
    ngay:Date,
})

module.exports = mongoose.model("chiTietCT",chiTietCT);