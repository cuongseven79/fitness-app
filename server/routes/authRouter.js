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
        const { email, password } = req.body; // req.body include {displayName, phoneNumber,email, password}
        const userSnapshot = await User.where('email', '==', email).get();
        if (!userSnapshot.empty) {
            return res.status(400).send({ statusCode: 400 });
        }
        const salt = 10;
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;

        await User.add({ ...req.body, role: 'customer' })
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

/* ----- Login ---  */
const handleVerifyLogin = async (req, res) => {
    const { email, password } = req.body;
    const userRef = (await User.where('email', '==', email).get());
    const userInfor = userRef.docs[0];
    if (!userInfor) {
        res.status(404).send({ message: 'User not exists', statusCode: 404});
        return;
    }   
    const user = userInfor.data();
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        res.status(401).send('Incorrect password');
        return;
    }

    const userId = userRef.docs[0].id;
    const userData = { ...user, userId: userId }
    
    console.log("handleVerifyLogin ==>",userData)
    return res.status(200).send({ message: 'Login successful', statusCode: 200, userData: userData });
}

/* Routers SignUp */
router.get('/', handleGetAllUsers);
router.post('/create', handleCreateUser);
router.put('/update', handleUpdateUser);
router.delete('/delete', handleDeleteUser);

/* Routers Login */
router.post('/', handleVerifyLogin);

module.exports = router;