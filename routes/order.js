const express = require("express");
const data = require("../data/data");
const Order = require("../models/Order");

const router = express.Router();

// Post an order of a user
router.get("/add/:userId", async (req, res) => {

    try {
        let id = JSON.parse(req.query.itemId);
        let quantity = JSON.parse(req.query.quantity);
        let userId = parseInt(req.params.userId);
        let length = id.length;
        let list = [];

        for (let i = 0; i < length; i++) {
            list.push({ quantity: quantity[i], itemId: id[i] });
        }

        let orderNo = data.orders.size + 1;
        data.orders.set(orderNo, new Order(orderNo, list));

        if (data.userOrders.has(userId)) {
            data.userOrders.get(userId).push(orderNo);
        } else {
            data.userOrders.set(userId, [orderNo]);
        }

        res.status(200).json({ "msg": "Order Placed" , "currentOrders" : data.userOrders.get(userId) });
    } catch (e) {
        res.status(500).json({ "msg": "Something went wrong" });
    }
});


// Update a particular order
router.put("/edit/:userId/:orderId", async (req, res) => {

    try {
        let id = JSON.parse(req.query.itemId);
        let quantity = JSON.parse(req.query.quantity);
        let userId = parseInt(req.params.userId);
        let orderId = parseInt(req.params.orderId);
        let length = id.length;
        let list = [];

        for (let i = 0; i < length; i++) {
            list.push({ quantity: quantity[i], itemId: id[i] });
        }

        data.orders.set(orderId, new Order(orderId, list));
        res.status(200).json({ "msg": "Order Updated", "currentOrders" : data.userOrders.get(userId) });
    } catch (e) {
        res.status(500).json({ "msg": "Something went wrong" });
    }
});


// Delete a particular order
router.delete("/delete", async (req, res) => {
    try {
        let x =  data.orders.get(parseInt(req.query.orderId));
        data.orders.delete(parseInt(req.query.orderId));
        res.status(200).json({ "msg": "Order Deleted", "deletedOrder" : x});
    } catch (e) {
        res.status(500).json({ "msg": "Something went wrong" });
    }
});

module.exports = router;
