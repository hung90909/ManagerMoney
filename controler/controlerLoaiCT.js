const bodyParser = require('body-parser');
const express = require('express')
const user = require("../model/user")
const loaiCT = require('../model/loaiCT');
const multer = require("multer");
const path = require('path');
const jimp = require("jimp")
const app = express();
app.use(bodyParser.json())
app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // tên file
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 } // giới hạn kích thước file tải lên là 2MB
});


app.post("/getAllLoaiCT",async(req  ,res) =>{
    try {
        await loaiCT.find({userID:req.body.id})
        .then(item => res.json(item))
    } catch (error) {
        console.log(error)
    }
})

app.post('/addLoaiCT', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Không tìm thấy ảnh để upload.' });
      }
      // Lưu thông tin loaiCT vào cơ sở dữ liệu
      const imagePath = req.file.path;
      const image = await jimp.read(imagePath);
      const base64Image = await image.getBase64Async(jimp.AUTO);
      const loai = new loaiCT({name:req.body.name , image:base64Image ,
         nameKhoan:req.body.nameKhoan , userID: req.body.userID});
      await loai.save();
  
      res.json('Lưu thành công');
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Đã có lỗi xảy ra khi xử lý yêu cầu.' });
    }
  });
  




module.exports = app