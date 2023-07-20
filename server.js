const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const methods = require('method-override');
const user = require("./controler/controlerUser")
const loaiCT = require("./controler/controlerLoaiCT")
const giaoDich = require("./controler/controlerChiTietCT")
const app = express();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.json())
app.use(methods("_method"))
const port = 9999;
mongoose.connect('mongodb://127.0.0.1:27017/ManagerMoney')
    .then(function () {
        console.log("ket noi thanh cong !")
    })
    .catch(function (err) {
        console.log("error: " + err)
    })
app.engine('.hbs', handlebars.engine({
    extname: "hbs",
}))
app.set('view engine', '.hbs');
app.set('views', './views');
app.use("/user", user)
app.use("/loaiCT", loaiCT)
app.use("/giaoDich", giaoDich)
app.listen(port, function () {
    console.log("running port " + port)
})



//       "engines": {
//     "node": ">=14 <15"
//   }