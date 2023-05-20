import express from "express";
const images = express.Router();

images.get('/', (req, res) => {
    res.send("students routes");
});

export default images;