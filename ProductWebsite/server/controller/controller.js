const UploadModel = require('../model/schema');
const fs = require('fs');
const { response } = require('express');

exports.home=(req,res)=>{
    res.render('main');
}

exports.uploads = (req,res,next)=>{
    const files = req.files;

    if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }

    //conver images to base64 encoding 

    let imgArray = files.map((file) =>{
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    })

    let result = imgArray.map((src, index) =>{
        //create object to store data in the database
        let finalImage = {
            filename:files[index].originalname,
            contentType:files[index].mimetype,
            imageBase64: src
        }

        let newUpload = new UploadModel(finalImage);

        return newUpload
            .save()
            .then(() => {
                return { msg: `${files[index].originalname}image Uploaded Successfullly`}
            })
            .catch(error =>{
                if(error){
                    if(error.name === 'MongoError' && error.code === 11000){
                        return Promise.reject({ error: `Duplicate ${files[index].originalname}. File Already exists!`})
                    }
                    return Promise.reject({ error: error.message || `Cannot Uplaod ${files[index].originalname} Something Missing`})
                }
            })
    });

    Promise.all(result)
        .then(msg =>{
            response.json(msg);
            //res.redirect('/')
        })
        .catch(err =>{
            res.json(err)
        })
}

