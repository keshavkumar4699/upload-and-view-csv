const CSV = require("../models/csv");
const { unlink } = require('node:fs/promises');
const csv_to_json = require('csvtojson');

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

module.exports.getcsvfiles = async function (req, res) {
  try {
    let csvfile = await CSV.find({}).sort({ updatedAt: "desc" }); //fetch csv files list from database and sort them
    return res.send({ csvfile: csvfile });
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
      };
      let newfile = await CSV.create(file); //create new csv file in database
      file.id = String(newfile._id);
      res.send({ response: file });
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
    unlink(csvfile.path); //delete files from uploads
    return res.redirect("back");
  } catch(err){
    console.log("Files cannot be deleted", err);
  }
};

//method for viewing clicked csv file
module.exports.viewcsv = async function (req, res) {
  var results = [];
  try{
    console.log(req.query.id);
    let csvfile = await CSV.findById(req.query.id); //select file with id from database
    console.log(csvfile.path);
    csv_to_json().fromFile(csvfile.path)
    .then(data => {
      console.log(data);
    });
  } catch(err) {
    console.log("error occured", err);
  }
}
