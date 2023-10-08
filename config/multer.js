const path = require("path");
const multer = require("multer"); //multer import

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/'), //upload path
  filename: function (_req, file, cb) {
    cb(
      null,
      // file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      file.originalname //keeps the orignal file name when uploaded
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /csv/; //allowed ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //Check ext
  const mimetype = filetypes.test(file.mimetype); //check mime
  //check for both mime and extension
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    console.log("Only CSV files can be uploaded");
    return cb(null, false);
  }
}

module.exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 200000000, // upload csv file size limit
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
}).single('csvFile');
