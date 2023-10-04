const CSV = require('../models/csv');

//method for home page view
module.exports.home = async function(req, res){
  let csvfile = await CSV.find({});
  csvfile.sort();
  try{
    return res.render("home",{ 
      title: 'CSV Manager',
      csvfile: csvfile
    })
  } catch(err){
    console.log("***Error Encountered***", err)
  }
}

//method for uploading files
module.exports.uploadcsv = function (req, res, next) {
  try{
    if(req.file){
      CSV.create({
        name: req.file.filename,
        path: req.file.path
      });
    } else {
      console.log("This file extension is not accepted");
    }
    return res.redirect('back');
  } catch(err){
    console.log("error found", err);
  }
}