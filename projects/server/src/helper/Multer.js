const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const sub = req.directory || 'avatars'; // Retrieve the subfolder dynamically from the request
    const destinationFolder = path.join('src/storage', sub);
    cb(null, destinationFolder);
  },
  filename: function(req, file, cb) {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});



/**
 * upload - multer instance initialization
 */
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB (max file size)
  },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.avif') {
      return cb(new Error('Only images are allowed'))
    }
    cb(null, true)
  },
});

/**
 * UploadPhoto - a middleware helper to upload photo to storage using multer
 * @param directory
 * @returns {(function(*, *, *): void)|*}
 */
const UploadPhoto = (directory) => {
  return (req, res, next) => {
    req.directory = directory;
    upload.single("photo")(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred during the file upload
        return res.status(500).json({ message: err.message });
      } else if (err) {
        // An unknown error occurred during the file upload
        return res.status(500).json({ message: err.message || "Unknown error occurred during file upload" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      req.uniqueUrl = `/storage/${directory}/${req.file.filename}`;
      next();
    });
  };
};

/**
 * UnlinkPhoto - a helper to unlink photo from storage
 * @param name
 */
const UnlinkPhoto = (name) => {
  const filePath = path.join(__dirname, `../../src/${name}`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  } else {
    console.log("File does not exist:", filePath);
  }
};

module.exports = { UploadPhoto, UnlinkPhoto };