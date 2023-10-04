const path = require("path");

//multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/'),
  filename: function (_req, file, cb) {
    cb(
      null,
      // file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      file.originalname
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /csv/; //allowed ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //Check ext
  const mimetype = filetypes.test(file.mimetype); //check mime

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}

module.exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 200000000, // 2MB csv file size limit
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
}).single('csvFile');
