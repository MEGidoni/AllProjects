const express = require('express');
const router = express.Router();
const { DataModel, validData } = require('../models/DataModel');

router.post("/", async (req, res) => {
  const validteData = validData(req.body);
  if (validteData.error) {
    return res.status(400).json(validteData.error.details);
  }
  try {
    const data = new DataModel(req.body);
    await data.save();
    res.status(200).json({"Altitude":data.Altitude , "HIS":data.HIS , "ADI":data.ADI});
  } catch (error) {
    console.log(err);
    res.status(502).json(err);
  }
});



module.exports = router;