const { products, productPromotionPackages,
    promotionPackages } = require('./database_schema/amway');

const totalItemPrice = (item) => {

    // Search item product promotion package
    const itemProductPromotionPackage = productPromotionPackages.find(x => x.productId === item.itemId);
    const itemPromotionPackage = promotionPackages.find(x => x.id === itemProductPromotionPackage.promotionPackageId);

    // Query item product details
    const itemProducts = products.find(x => x.id === item.itemId);

    // Item quantity eligible for discounting
    const quantityDiscountEligible = Math.floor(item.qty / itemPromotionPackage.minItem) * itemPromotionPackage.minItem;

    // Remaining items not discounted
    const remainingItemNotDiscounted = item.qty - quantityDiscountEligible;

    // Promotional item total prices after discounting
    const discountedPromotionalItemPrices = quantityDiscountEligible * itemPromotionPackage.priceMultiplier * itemProducts.price;
    console.log("discPrice: " + discountedPromotionalItemPrices);
    // Remaining items not discounted total prices;
    const remainingItemNotDiscountedPrice = remainingItemNotDiscounted * itemProducts.price;
    
    //Total prices of item
    const totalItemPrice = discountedPromotionalItemPrices + remainingItemNotDiscountedPrice;

  

    console.log(itemProducts.name);
    console.log("qty: " + item.qty);
    console.log("qtyEligibleForDiscount: " + quantityDiscountEligible);
    console.log("remainingItems: " + remainingItemNotDiscounted);
    console.log(itemPromotionPackage.description);
    console.log("Total Item Price: " + totalItemPrice);
    console.log("------------------------")

    return totalItemPrice;
}

exports.totalItemPrice = totalItemPrice;