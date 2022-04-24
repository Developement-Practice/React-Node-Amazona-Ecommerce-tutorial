import express from "express";
import data from "./Data.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get('/api/products/:id', (req, res) => {

    const product = data.products.find((x) => x._id === req.params.id);

    // console.log(data);
    console.log(product);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product not found" })
    }
})

app.get('/api/products', (req, res) => {
    res.send(data.products);
})


app.get('/', (req, res) => {
    res.send("Server is ready");
})

const port = process.env.PORT || 5000; // this is working
app.listen(port, () => {
    console.log(`Server is at http://localhost:${port}`);
});