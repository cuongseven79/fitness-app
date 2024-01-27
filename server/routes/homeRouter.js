const express = require('express');
const router = express.Router();
const { User, Feedback } = require('../config/firebase-config');

/* GET */
const handleGetTrainersPopular = async (req, res) => {
    try {
        const fields = ['taekwondo', 'yoga', 'boxing','pilates','aerobic','gym']
        const snapshot = await User.where('role', '==', 'pt')
                           .where('rating', '>=', '4')
                           .where('field', 'in', fields )
                           .limit(6)
                           .get();
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

const handleGetStatisData = async (req, res) => {
    try {
        const trainersNumber = (await User.where('role','==','pt').get()).docs.map(doc => doc.data()).length;
        const allMembers = (await User.get()).docs.map(doc => doc.data()).length;

        const statisData = [
            { label: 'programs', value: 6 },
            { label: 'members', value: allMembers },
            { label: 'coachs', value: trainersNumber },
            { label: 'Years of Experience', value: 15 },
        ]
        console.log(statisData)

        return res.status(200).json({statusCode: 200, statisData: statisData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
}

const handleGetFeedback = async (req, res) => { 
    try {
        const snapshot = await Feedback.where('public_status','==','published').get();
        if (snapshot.empty) {
            return res.status(400).json({ statusCode: 400, message: "No feedback found" });
        }
        const feedbacks = snapshot.docs.map(doc => {
            const feedback = doc.data();
            return feedback;
        });
        return res.status(200).json({statusCode: 200, feedbacks: feedbacks });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
}
const handlePostFeedback = async (req, res) => { 
    try {
        const { displayName, title, message } = req.body;
        console.log(displayName, title, message)
        await Feedback.doc().set({displayName, title, message, public_status:'unpublished'});
        return res.status(200).json({ message: "Feedback sent successfully", statusCode: 200 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
}


router.get('/best-trainers', handleGetTrainersPopular);
router.get('/statistics', handleGetStatisData);
router.get('/feedback', handleGetFeedback);
router.post('/feedback', handlePostFeedback);

module.exports = router;