const admin = require('firebase-admin');
const uuid = require('uuid-v4');
const dotenv = require('dotenv');
const cors = require("cors");
const express = require('express');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
dotenv.config();
var serviceAccount = require("./config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET
});

const bucket = admin.storage().bucket();
const myStorage = multer.memoryStorage();
const upload = multer({ storage: myStorage });

app.post('/profile', upload.single('image'), async (req, res) => {
  console.log(req.file)
  if (!req.file) { 
    console.log("ERROR server")
    return res.status(400).send('No file uploaded.');
  }
  
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: uuid(),
    },
    contentType: req.file.mimetype, 
    cacheControl: 'public, max-age=31536000',
  };

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: metadata,
    gzip: true
  });

  blobStream.on('error', (err) => {
    return res.status(500).json({ error: err });
  });
  blobStream.on('finish', () => {
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    return res.status(201).json({ imageUrl });
  });

  blobStream.end(req.file.buffer);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})