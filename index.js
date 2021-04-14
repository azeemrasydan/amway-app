const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const path = require('path');
const router = require('express').Router();
const bodyParser = require("body-parser");

const checkoutItems = require('./models/checkoutItems');
const products = require('./models/products');


//Allow all cross-origins

app.use(cors());

//Allow use of Json parser
app.use(bodyParser.json({
  limit: '50mb'
}));

//Default index file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.post('/checkout-items', checkoutItems);
router.get('/products', products);


//Serve static public files API
app.use(express.static('public'))
app.use('/api/', router);

//Include master API routes
// require('./routes')(app);

//Listen on port specified above
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});