const amway = require('./database_schema/amway');

module.exports = (req, res) => {

    res.send(amway.products)
}