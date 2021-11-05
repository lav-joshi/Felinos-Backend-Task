const Item = require("../models/Item");
const User = require("../models/User");

// Registered users on platform
let users = [
    new User(1, 'Lav', '8840397164', 'lcs2019022@iiitl.ac.in'),
    new User(2, 'Kush', '8887865885', 'kush@gmail.com')
];

// All items in the store
let items = [
    new Item(1, 'Shirt', 'Peter England: Navy Full Sleeves Formal Shirt '),
    new Item(2, 'Watch', 'Rado: Centrix')
];

// All the orders by the users
const orders = new Map();

// Orders list of the particular user
const userOrders = new Map();

module.exports = { users, orders, userOrders, items };