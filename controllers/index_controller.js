const CSV = require('../models/csv');
const { unlink } = require('node:fs/promises')

//method for home page view
module.exports.home = async function(req, res){
  let csvfile = await CSV.find({}).sort({'updatedAt':'desc'});//fetch csv files list from database and sort them
  try{
    return res.render("home",{ 
      title: 'CSV Manager', //home page title
      csvfile: csvfile //send fetched data to home.ejs for viewing
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
      }); //create new csv file in database
    } else {
      console.log("Only CSV files can be uploaded"); //check if uploaded file is csv or not (if undefined then it's not csv)
    }
    return res.redirect('back');
  } catch(err){
    console.log("error found", err);
  }
}

//method for deleting uploaded csv
module.exports.destroy = async function(req, res){
  try{
    let csvfile = await CSV.findByIdAndDelete(req.query.id);
    await unlink(csvfile.path);
  } catch {
    console.log("Files cannot be deleted");
  }
}