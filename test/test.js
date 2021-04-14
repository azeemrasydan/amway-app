const chai = require('chai');

const expect = require('chai').expect;
const should = require('chai').should();
const chaiAlmost = require('chai-almost');

chai.use(chaiAlmost(1));

// Import the class to be tested
Product = require('../models/Product');

// Mock checkout data
const carts = require('./checkoutItemMock');


carts.forEach(audience => {

    describe('Product Class Unit Testing Audience Level ' + audience.AudienceLevelId, () => {

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

                expect(parseFloat(product.getItemPrice(item.qty, audience.AudienceLevelId))).to.almost.equal(item.totalPrice);

            });




        })

    })

})

