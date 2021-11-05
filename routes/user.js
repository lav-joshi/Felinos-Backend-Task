const express = require("express");
const User = require("../models/User");
const data = require("../data/data");
const router = express.Router();

// add a new user
router.post("/add", async (req, res) => {

    try {
        let userId = data.users.length + 1;
        const newUser = new User(userId, req.query.name, req.query.mobileNo, req.query.email);
        await data.users.push(newUser);
        res.status(200).json({ "msg": "User added", "user" : newUser });
    } catch (e) {
        res.status(500).json({ "msg": "Something went wrong" });
    }
});


// get all orders of a user
router.get("/getorders/:userId", async (req, res) => {

    try {
        let userId = parseInt(req.params.userId);
        let orders = data.userOrders.get(userId);
        let userOrders = [];

        for (let i = 0; orders && i < orders.length ; i++) {
            if (data.orders.has(orders[i])) {
                userOrders.push(data.orders.get(orders[i]));
            }
        }
    
        res.status(200).json({ "allOrders": userOrders });
    } catch (e) {
        res.status(500).json({ "msg": "Something went wrong" });
    }
});

module.exports = router;
