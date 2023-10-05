const CSV = require("../models/csv");
const { unlink } = require("node:fs/promises");

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
      console.log(file);
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
    await unlink(csvfile.path); //delete files from uploads
    return res.redirect("back");
  } catch {
    console.log("Files cannot be deleted");
  }
};
