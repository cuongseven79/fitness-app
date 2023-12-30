const express = require('express');
const router = express.Router();
const { User } = require('../config/firebase-config');
const bcrypt = require('bcrypt');

/* GET */
const handleGetAllUsers = async (req, res) => {
    const snapshot = await User.get();
    const users = snapshot.docs.map((user) => ({id: user.id,...user.data()}));
    return res.send({ message: "All Users get successfully", users });
}


/* CREATE */
const handleCreateUser = async (req, res) => {
    try {
        const {email,password} = req.body; // req.body include {fullName, phoneNumber,email, password}
        const userSnapshot = await User.where('email', '==', email).get();
        if (!userSnapshot.empty) {
            return res.status(400).send({ statusCode: 400 });
        }
        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;

        await User.add(req.body)
            return res.status(201).send({ statusCode: 201 });
    } catch (error) {
        return res.status(500).send({ message: "Server fail", error: error.message });
    }
}

/* UPDATE */
const handleUpdateUser = async(req, res) => {
    const { id, ...data } = req.body;
    await User.doc(id).update(data);
    return res.status(200).json({ message: "User updated successfully", data });
}

/* DELETE */
const handleDeleteUser = async (req, res) => {
    const { id } = req.body;
    await User.doc(id).delete();
    return res.status(200).json({ message: "User deleted successfully"});
}

router.get('/', handleGetAllUsers);
router.post('/create', handleCreateUser);
router.put('/update', handleUpdateUser);
router.delete('/delete', handleDeleteUser);

module.exports = router;