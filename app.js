const express = require("express");
const user = require("./routes/user");
const order = require("./routes/order");
const app = express();
const PORT = process.env.PORT || 3000;


app.use("/user", user);
app.use("/order", order);

app.listen(PORT, () => {
    console.log("Server Started");
});