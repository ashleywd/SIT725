const express = require("express");
const router = express.Router();
const ServerModel = require("../src/model");

// Calculator route
router.get("/addTwoNumbers", (req, res) => {
  const n1 = req.query.n1;
  const n2 = req.query.n2;
  const result = ServerModel.addTwoNumbers(n1, n2);
  res.json({ statuscode: 200, data: result });
});

module.exports = router;
