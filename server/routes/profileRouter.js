const admin = require('firebase-admin');
const uuid = require('uuid-v4');
const multer = require('multer');
const express = require('express');
const { User } = require('../config/firebase-config');
const router = express.Router();
const bucket = admin.storage().bucket();
const tempStorage = multer.memoryStorage();
const upload = multer({ storage: tempStorage });


/* CREATE method */
const handleUpload = async (req, res) => {  
  if (!req.file) { 
    return res.status(400).send('No file uploaded.');
  }

  const { userId, typeImage } = req.body
  const userRef = User.doc(userId);
  const user = await userRef.get();

  const certURLs =  user.data().certURL  //this line used to check changes of cert only to show remove button in ImageUploadCustomer component.

  const metadata = {
    metadata: { firebaseStorageDownloadTokens: uuid() },
    contentType: req.file.mimetype, 
    cacheControl: 'public, max-age=31536000',
  };
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({ metadata, gzip: true });
  blobStream.on('error', (err) => res.status(500).json({ error: err.message }));
  blobStream.on('finish', () => {
    const imageURL = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    if (typeImage === 'photo') {
      userRef.update({ photoURL: imageURL }); 
    } else if (typeImage === 'certificate') {
         userRef.update({ certURL: admin.firestore.FieldValue.arrayUnion(imageURL) });
    }
    res.status(201).json({ message:"Uploaded successfull" ,statusCode: 201, photoURL: imageURL, certURL: certURLs });
  });
  blobStream.end(req.file.buffer);
};


/* DELETE method */
const handleDelete = async (req, res) => {
  const { fileName, userId, typeImage } = req.body;
  if (!fileName) { 
    return res.status(400).send('No image name provided.');
  }

  const userRef = User.doc(userId);
  const user = await userRef.get();

  if (!user.exists) {
    return res.status(404).send('User not found');
  }

  const imageRef = bucket.file(fileName);
  const imageURL = `https://storage.googleapis.com/${bucket.name}/${imageRef.name}`;
  try {
    if (typeImage === 'photo') {
      await User.doc(userId).update({ photoURL: "" }) //set photoURL to "" in database
    } else if (typeImage === 'certificate') {
      await User.doc(userId).update({ certURL: admin.firestore.FieldValue.arrayRemove(imageURL) }); //remove specific imageURL from certURL array in database
    }
    await imageRef.delete(); //delete in storage image
  } catch (error) {
    return res.status(500).send('Delete failed with error.',error.message);
  }
  return res.status(200).send('Image deleted successfully.');
};

/* GET method */
const handleGetImages = async (req, res) => {
  const [files] = await bucket.getFiles();
  const fileUrls = files.map(file => `https://storage.googleapis.com/${bucket.name}/${file.name}`);
  res.status(200).json(fileUrls);
};

const handleGetProfile = async(req,res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).send({ message: "No user id provided." });
    }
    const userSnapshot = await User.doc(userId).get();
    const userProfile = userSnapshot.data();

    const {password,...rest } = userProfile;
    return res.status(200).json({ message: "User get successfully", statusCode:200, user: rest});
  } catch (error) {
    return res.status(500).send({message: error.message})
  }
}

router.get('/', handleGetProfile);
router.post('/', upload.single('image'), handleUpload);
router.delete('/delete', handleDelete);

module.exports = router;