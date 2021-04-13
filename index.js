const express = require('express');
const app = express();
const port = 3000;
var path = require('path');

//Serve static public files API
app.use('/static', express.static(path.join(__dirname, 'public')))

//Default index file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/public/index.html'));
});

//Listen on port specified above
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});