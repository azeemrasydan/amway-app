const { products, productPromotionPackages,
    promotionPackages, audienceLevelPromotionPackages } = require('./database_schema/amway');

module.exports = class Product {

    constructor(productId) {

        // Build constructor from argument
        this.productId = productId;

        // Search for this product particular promotion package
        this.productPromotionPackage = productPromotionPackages.find(x => x.productId === this.productId);

        // Determine if it is a promotional product or otherwise
        this.isPromotionalProduct = (this.productPromotionPackage) ? (true) : (false);

        //Load and denormalize data 
        this.itemProducts = products.find(x => x.id === this.productId);

    }

    getItemPrice(qty, audienceLevelId) {

        var totalItemPrice;




        // Find out promotion list for the two
        var promotionIdForAudience = audienceLevelPromotionPackages.find(x => x.id === audienceLevelId).promotionPackageId;

        if (this.isPromotionalProduct) {
            var promotionIdForProduct = this.productPromotionPackage.promotionPackageId;
            var minItemForPromotionProduct = promotionPackages.find(x => x.id === promotionIdForProduct).minItem;
        } else {

            var minItemForPromotionProduct = promotionPackages.find(x => x.id === promotionIdForAudience).minItem;
        }


        // Assign promotion according to promotional status of the product
        var itemPromotionId = (this.isPromotionalProduct && qty >= minItemForPromotionProduct) ? // If it is promotional product
            (promotionIdForProduct) //true - product promotion package applies
            : (promotionIdForAudience) //false - audience promotion package applies

        var itemPromotionPackage = promotionPackages.find(x => x.id === itemPromotionId);

        // Perform only a deal on items according to eligible item promotion
        switch (itemPromotionId) {
            case 1:
            case 2:
                totalItemPrice = qty * this.itemProducts.price * itemPromotionPackage.priceMultiplier;
                break;

            case 3:
                if (qty >= itemPromotionPackage.minItem) {

                    totalItemPrice = qty * this.itemProducts.price * itemPromotionPackage.priceMultiplier
                } else {
                    totalItemPrice = qty * this.itemProducts.price
                }
                break;

            case 4:
                // Promotional item total prices after discounting
                const quantityDiscountEligible = Math.floor(qty / itemPromotionPackage.minItem) * itemPromotionPackage.minItem;
                const discountedPromotionalItemPrices = quantityDiscountEligible * itemPromotionPackage.priceMultiplier * this.itemProducts.price;

                // Remaining items not discounted total prices;
                const remainingItemNotDiscountedPrice = (qty - quantityDiscountEligible) * this.itemProducts.price;

                totalItemPrice = discountedPromotionalItemPrices + remainingItemNotDiscountedPrice;

                break;

            // Cases can be added in the future for applying different scheme of promotion and deals 

        }

        return parseFloat(totalItemPrice.toFixed(2));
    }


}