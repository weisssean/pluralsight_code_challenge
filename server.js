const express = require("express");
const app = express();

/**Added cors to get around http cross origin issue issue */
var cors = require('cors');
app.use(cors());

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

/**Just a route for getting all the data from the database*/
app.get("/data", (req, res) => {
    res.redirect('http://localhost:3004');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
