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

    //conver images to base 64
    res.json(files);


}

