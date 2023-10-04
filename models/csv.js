const mongoose = require('mongoose');

const csvSchema  = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  path: {
    type: String,
    unique: true
  }
},
{
  timestamps: true
});

const CSVfile = mongoose.model('CSVfile', csvSchema);

module.exports = CSVfile;