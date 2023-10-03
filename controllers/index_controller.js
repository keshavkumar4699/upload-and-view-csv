//method for home page view
module.exports.home = async function(req, res){
  try{
    return res.render("home",{ 
      title: 'CSV Manager',
    })
  } catch(err){
    console.log("***Error Encountered***", err)
  }
}

//method for uploading files
module.exports.uploadcsv = function (req, res, next) {
  try{
    // req.file is the `csvFile` file
    console.log("req.file is", req.file);
    // req.body will hold the text fields, if there were any
  } catch(err){
    console.log("error found", err);
  }
}