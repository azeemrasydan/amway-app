const overallPrice = require('./overallPrice');

module.exports = (req, res) => {

    // Start counting checkout items
    let checkoutItems = req.body.checkoutItems;
    let audienceLevelId = req.body.RecipientLevel;

    const itemsTotalPrice = overallPrice(audienceLevelId, checkoutItems);

    res.send(itemsTotalPrice);

}