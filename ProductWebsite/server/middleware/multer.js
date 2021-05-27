const multer=require('multer');

//set storage
multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads')
    },
    filename: function(req,file,cb){
        //image.jpg
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        
        cb(null, file.filename+'-'+Date.now()+ ext)
    }
})