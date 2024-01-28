const admin = require('firebase-admin');
const uuid = require('uuid-v4');
const multer = require('multer');
const express = require('express');
const { User, Order } = require('../config/firebase-config');
const router = express.Router();
const bucket = admin.storage().bucket();
const tempStorage = multer.memoryStorage();
const upload = multer({ storage: tempStorage });
const handlePostOrder = async(req,res) => {
    try {
        const { displayName, date, orderId, service_type, start_time, end_time, paid_money} = req.body;
        console.log( displayName, date, orderId, service_type, start_time, end_time, paid_money)
        await Order.doc().set({ displayName, date, orderId, service_type, start_time, end_time, paid_money });
        console.log(Order)
        return res.status(200).json({ message: "Order sent successfully", statusCode: 200 });
    } catch (error) {
      return res.status(500).send({message: error.message})
    }
  }
  const handleGetOrder = async (req, res) => { 
    console.log("running")
    try {
        const snapshot = await Order.get();
     
        if (snapshot.empty) {
            return res.status(400).json({ statusCode: 400, message: "No Order found" });
        }
        const orders = snapshot.docs.map(doc => {
            const order = doc.data();

            return order;
        });
        console.log(orders)
        return res.status(200).json({statusCode: 200, ordersData: orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
}
  
router.get('/', handleGetOrder);
router.post('/manage-orders', handlePostOrder);
module.exports = router;