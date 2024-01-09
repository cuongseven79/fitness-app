const express = require('express');
const router = express.Router();
const { User } = require('../config/firebase-config');

/* GET */
const handleGetTrainersPopular = async (req, res) => {
    try {
        const snapshot = await User.where('role', '==', 'pt').where('rating', '>=', '4').get();
        if (snapshot.empty) {
            return res.status(400).json({ statusCode: 400, message: "No trainers found" });
        }
        const trainers = snapshot.docs.map(doc => {
            const trainer = doc.data();
            delete trainer.password; // Remove password from the data to be sent to the client.
            return trainer;
        });
        return res.status(200).json({ message: "All Users get successfully", statusCode: 200, trainers: trainers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
}

router.get('/', handleGetTrainersPopular);

module.exports = router;