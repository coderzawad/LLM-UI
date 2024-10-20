var express = require("express");
var fs = require("fs");
var path = require("path");
var app = express();
var port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // Send the index.html file when someone visits "/"
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log("It just works! Running at http://localhost:3000");
});

