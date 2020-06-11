var express = require("express");
var router = express.Router();
var puppeteer = require("./puppeteer.js")

router.get("/", function (req, res) {
  res.render("index");
})

router.get("/scrape", function (req, res) {
  puppeteer.then(function(data) {
    res.json(data);
  });
})

module.exports = router;