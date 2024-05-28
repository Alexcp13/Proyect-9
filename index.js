require("dotenv").config()

const { scrapper } = require("./SRC/utils/scrapper");

const express = require("express");
const { connectDB } = require("./SRC/config/db");
const laptopsRouter = require("./SRC/Api/routes/laptop");



const app = express();

connectDB();

app.use("/api/v1/laptops", laptopsRouter)




app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found")
})

app.listen(3000, () => {
    console.log(("http://localhost:3000"))
})


