const CSV = require("../models/csv");
const fs = require('fs').promises;

//method for home page view
module.exports.home = async function (req, res) {
  try {
    return res.render("home", {
      title: "CSV Manager", //home page title
    });
  } catch (err) {
    console.log("***Error Encountered***", err);
  }
};

//method to get csv files from database
module.exports.getcsvfiles = async function (req, res) {
  try {
    let csvfile = await CSV.find({}).sort({ updatedAt: "desc" }); //fetch csv files list from database and sort them
    return res.send({ csvfile: csvfile }); //send csvfile data as csvfile
  } catch (err) {
    console.log("**error encountered**", err);
  }
};

//method for uploading files
module.exports.uploadcsv = async function (req, res, next) {
  try {
    if (req.file) {
      let file = {
        name: req.file.filename,
        path: req.file.path,
      };//setup file to create new
      let newfile = await CSV.create(file); //create new csv file in database
      file.id = String(newfile._id);
      res.send({ response: file }); //send file as response
    } else {
      console.log("Only CSV files can be uploaded"); //check if uploaded file is csv or not (if undefined then it's not csv)
    }
  } catch (err) {
    console.log("error found", err);
  }
};

//method for deleting uploaded csv
module.exports.destroy = async function (req, res) {
  try {
    let csvfile = await CSV.findByIdAndDelete(req.query.id); //delete file from database
    fs.unlink(csvfile.path); //delete files from uploads
    return res.redirect("back");
  } catch(err){
    console.log("Files cannot be deleted", err);
  }
};