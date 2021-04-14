const { promotionPackages, audienceLevelPromotionPackages } = require('./database_schema/amway');
const Product = require('./Product');

module.exports = (req, res) => {

    // Search user promotion package
    const userLevelPromotionPackage = audienceLevelPromotionPackages.find(x => x.audienceLevelId == req.body.RecipientLevel);
    const userPromotionPackage = promotionPackages.find(x => x.id === userLevelPromotionPackage.promotionPackageId);


    res.send(userPromotionPackage);
    // console.log(products.find(x=> x.id === 1));

    // Start counting checkout items
    let checkoutItems = req.body.checkoutItems;

    var itemsTotalPrice = 0;

    checkoutItems.forEach(item => {

        let itemProduct = new Product(item.itemId);
        
        itemsTotalPrice = itemsTotalPrice + itemProduct.getItemPrice(item.qty, req.body.RecipientLevel)
        console.log(itemProduct.isPromotionalProduct);
        console.log(itemProduct.getItemPrice(item.qty));


    }
    
    )

    console.log("All Total Price: " + itemsTotalPrice);


}