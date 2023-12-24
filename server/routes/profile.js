const multer = require('multer');
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, '../images')
    },
    filename: function (req, file, cb) {
      return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
  
const upload = multer({ storage })

router.post('/profile', upload.single('file'), async (req, res) => {
  console.log(req.body)
  console.log(req.file)
});

module.exports = router;
