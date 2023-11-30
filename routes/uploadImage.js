const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("../models/db/itemImages");
const Images = mongoose.model("Item_Images");

router.post("/uploadItemImage", (req, res) => {
  const { base64 } = req.body;
  try {
    const resp = Images.create({ image: base64 });
    res.send({ status: "image added", resp});
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }

  // console.log(base64);
});

module.exports = router;
