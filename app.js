const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const SmallUrl = require("./model/SmallUrl");

mongoose.connect("mongodb://127.0.0.1:27017/smallurldb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.get("/:id", (req, res) => {
  const url = req.params.id;
  SmallUrl.findOne({ small: url }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(data.original);
    }
  });
});

app.post("/api/shorten", (req, res) => {
  const { url, custom } = req.body;
  let small;
  if (!custom) {
    small = new SmallUrl({ original: url });
  } else {
    small = new SmallUrl({ original: url, small: custom });
  }
  small.save((err, data) => {
    if (err) {
      res.json({ success: false, msg: err });
    } else {
      res.json({ small: data.small, success: true });
    }
  });
});

app.listen(port, () => console.log(`server has started on ${port}`));
