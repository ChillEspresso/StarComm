const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  product_name:{
    type:String,
    unique:true,
    required:true
  },
  product_price:{
    type:String,
    required:true
  },
  product_description:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  product_img:{
    data: Buffer,
    contentType: String
  }
})

module.exports = mongoose.model('Product_data', ProductSchema);
