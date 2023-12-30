const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();

var serviceAccount = require("./serviceAccountKey.json");

 function initializeApp() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.DATABASE_URL,
      storageBucket: process.env.STORAGE_BUCKET,
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    });
  return admin;
}

const firebaseAdmin = initializeApp();
const database = firebaseAdmin.firestore();
const User = database.collection("User");
const Images = database.collection("Images");

module.exports = {User, Images};