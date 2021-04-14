const Product = require('./Product');

module.exports = (recipientLevel, checkoutItems) => {

    var itemsTotalPrice = 0;

    checkoutItems.forEach(item => {

        let itemProduct = new Product(item.itemId);

        itemsTotalPrice = itemsTotalPrice + itemProduct.getItemPrice(item.qty, recipientLevel)

    })

    return itemsTotalPrice.toFixed(2);
}