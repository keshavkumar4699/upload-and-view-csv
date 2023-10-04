const mongoose = require('mongoose');

const csvSchema  = new mongoose.Schema({
  name: {
    type: String
  },
  path: {
    type: String
  }
},
{
  timestamps: true
});

const CSVfile = mongoose.model('CSVfile', csvSchema);

module.exports = CSVfile;