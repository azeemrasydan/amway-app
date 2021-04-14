const chai = require('chai');

const expect = require('chai').expect;
const should = require('chai').should();
const chaiAlmost = require('chai-almost');

chai.use(chaiAlmost(1));

// Import the class to be tested
Product = require('../models/Product');

//Import module to be tested
var overallPrice = require('../models/overallPrice');

// Mock checkout data
const carts = require('./checkoutItemMock');



carts.forEach(audience => {

    let audienceLevelId = audience.AudienceLevelId;

    // Perform testing to observe correct functionality of Product Class
    describe('Product Class Unit Testing for Audience Level ' + audienceLevelId, () => {

        let items = audience.checkoutItems;

        items.forEach(item => {


            let product = new Product(item.itemId);

            it('This should be similar to item ' + item.itemId, function () {

                expect(product.productId).to.equal(item.itemId);

            });


            it('It is a promotional product! ' + item.isPromotionalProduct, () => {

                should.equal(product.isPromotionalProduct, item.isPromotionalProduct)

            });

            it('Total price of item ' + item.itemId + ' is expected to be ' + item.totalPrice, function () {

                expect(product.getItemPrice(item.qty, audienceLevelId)).to.almost.equal(item.totalPrice);

            });


        })

    });

    // Perform testing on evaluating overall prices for all items in carts
    describe('overallPrice unit testing for Audience Level ' + audienceLevelId, () => {

        let items = audience.checkoutItems;

        it('Overall price of cart ' + audienceLevelId + ' is expected to be ' + audience['overall price'], function () {

            expect(parseFloat(overallPrice(audienceLevelId, items))).to.almost.equal(audience['overall price']);

        });

    });

})

