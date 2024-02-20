const mongoose = require("mongoose")


let pl = mongoose.Schema;
const fooddetailsschema = new pl({
    fdid: String,
    fdname: String,
    fdtype: String,
    price: Number,
    pdescription: String,
    foodphoto:{
        data : Buffer,
        contentType:String,
    },
    status:String
});

var fooddetailsmodel = mongoose.model("fooddetailsschema", fooddetailsschema)
module.exports = fooddetailsmodel;