const express = require("express");
const app = express();

var cors = require('cors');
app.use(cors());

const port = process.env.PORT || 8080;

// let utilData;
const output = [];

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

app.get("/data", (req, res) => {
    res.redirect('http://localhost:3004');///questions?_page=0&_limit=20

  // res.json(output);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
