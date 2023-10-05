const CSV = require("../models/csv");
const csv_to_json = require('csvtojson');

//method to render csv view
module.exports.view = async function (req, res){
  res.render('view_csv',{
    title: "csv file",
  })
}

//method for viewing clicked csv file
module.exports.fetch_csv_data = async function (req, res) {
  var results = [];
  try{
    let csvfile = await CSV.findById(req.query.id); //select file with id from database
    csv_to_json().fromFile(csvfile.path)
    .then(data => {
      console.log(data);
    });
    // return res.send({ csvdata: data });
  } catch(err) {
    console.log("error occured", err);
  }
}