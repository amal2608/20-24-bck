const mongoose = require("mongoose")


let pl = mongoose.Schema;
const packagedetailsschema = new pl({
    packid: String,
    packname: String,
    pprice: Number,
    description: String,
    ttype:String,
    status: String,
    packimage: {
        data: Buffer,
        contentType: String,
    }
});

var packagedetailsmodel = mongoose.model("packagedetailsschema", packagedetailsschema)
module.exports = packagedetailsmodel;