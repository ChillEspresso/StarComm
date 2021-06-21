const route = require('express').Router()
const controller = require('../controller/controller');
const ProductController = require('../controller/ProductUpload');
const store = require('../middleware/multer');

//routes
route.get('/',controller.home);

route.post('/uploadMultiple',store.array('images', 12),controller.uploads);


//Display Images in server
route.get('/', (req, res) =>{
  ProductController.find({}, (err, items) =>{
    if(err) {
      console.log(err);
      res.status(500).send('An Error Occured', err);
    }
    else{
      res.sender('main', { items: items });
    }
  });
});

module.exports = route;