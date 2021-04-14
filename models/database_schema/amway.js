const audienceLevels = [
    {
        id: 1,
        name: "Associate"
    },
    {
        id: 2,
        name: "Diamond"
    }

];

const promotionPackages = [

    {
        id: 1,
        description: "Get 5% discount",
        priceMultiplier: 0.95,
        minItem: 1
    },
    {
        id: 2,
        description: "Get 20% discount",
        priceMultiplier: 0.8,
        minItem: 1
    },
    {
        id: 3,
        description: "Discount on 3 or more purchases",
        priceMultiplier: (0.7420457),
        minItem: 3
    },
    {
        id: 4,
        description: "Get 3 for 2 deal",
        priceMultiplier: 2 / 3,
        minItem: 3
    }
];

const products = [

    {
        id: 1,
        name: "Kone",
        price: 3488.99,
        img : "dummy-pdt-b.jpg",
        desc : "Greatest properly off ham exercise all.",
    },

    {
        id: 2,
        name: "Ironhide Cartridge",
        price: 529.99,
        img : "dummy-pdt-b.jpg",
        desc : "Unsatiable its possession nor off.",
    },
    {
        id: 3,
        name: "Steam Iron",
        price: 200,
        img : "dummy-pdt-b.jpg",
        desc : "All difficulty unreserved the solicitude.",
    },
    {
        id: 4,
        name: "Blood Pressure Instrument",
        price: 30,
        img : "dummy-pdt-b.jpg",
        desc : "Had judgment out property the supplied. ",
    }
];

const productPromotionPackages = [

    {
        id: 1,
        productId: 1,
        promotionPackageId: 3,
        multipleTimesUse: true
    },
    {
        id: 2,
        productId: 2,
        promotionPackageId: 4,
        multipleTimesUse: true
    }
];

const audienceLevelPromotionPackages = [
    {
        id: 1,
        audienceLevelId: 1,
        promotionPackageId: 1,
        includePromotionItem: false
    },
    {
        id: 2,
        audienceLevelId: 2,
        promotionPackageId: 2,
        includePromotionItem: false
    }
]


module.exports = {

    audienceLevels,
    promotionPackages,
    products,
    productPromotionPackages,
    audienceLevelPromotionPackages

}