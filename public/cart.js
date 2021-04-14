var cart = {
  // (A) PROPERTIES
  hPdt: null, // HTML products list
  hItems: null, // HTML current cart
  items: {}, // Current items in cart

  // (B) LOCALSTORAGE CART
  // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
  save: function () {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // (B2) LOAD CART FROM LOCALSTORAGE
  load: function () {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) { cart.items = {}; }
    else { cart.items = JSON.parse(cart.items); }
  },

  // (B3) EMPTY ENTIRE CART
  nuke: function () {
    if (confirm("Empty cart?")) {
      cart.items = {};
      localStorage.removeItem("cart");
      cart.list();
    }
  },

  // (C) INITIALIZE
  init: function () {
    // (C1) GET HTML ELEMENTS
    cart.hPdt = document.getElementById("cart-products");
    cart.hItems = document.getElementById("cart-items");

    // (C2) DRAW PRODUCTS LIST
    // DUMMY PRODUCTS (PRODUCT ID : DATA)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAI%2BQKAEAAAAAgbmgf9UGDmaJ99nB63jChnWDIvQ%3D1G4f8sWa8jQiIseRSruRuRnq0xxGfLj68X1mX1U4t3MzUAzC10");


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };


    fetch("http://localhost:3000/api/products", requestOptions)
      .then(response =>
        response.json()
      )
      .then(result => {

        cart.hPdt.innerHTML = "";
        let p, item, part;
        result.forEach(element => {
          // WRAPPER
          p = element.id;
          result.find(x => x.id === p)

          item = document.createElement("div");
          item.className = "p-item";
          cart.hPdt.appendChild(item);

          // PRODUCT IMAGE
          part = document.createElement("img");
          part.src = "images/" + result.find(x => x.id === p).img;
          part.className = "p-img";
          item.appendChild(part);

          // PRODUCT NAME
          part = document.createElement("div");
          part.innerHTML = result.find(x => x.id === p).name;
          part.className = "p-name";
          item.appendChild(part);

          // PRODUCT DESCRIPTION
          part = document.createElement("div");
          part.innerHTML = result.find(x => x.id === p).desc;
          part.className = "p-desc";
          item.appendChild(part);

          // PRODUCT PRICE
          part = document.createElement("div");
          part.innerHTML = "RM " + result.find(x => x.id === p).price;
          part.className = "p-price";
          item.appendChild(part);

          // ADD TO CART
          part = document.createElement("input");
          part.type = "button";
          part.value = "Add to Cart";
          part.className = "cart p-add";
          part.onclick = cart.add;
          part.dataset.id = p;
          item.appendChild(part);
        })

        // (C3) LOAD CART FROM PREVIOUS SESSION
        cart.load();

        // (C4) LIST CURRENT CART ITEMS
        cart.list();

     
      }



      )
      .catch(error => console.log('error', error));



  },

  // (D) LIST CURRENT CART ITEMS (IN HTML)
  list: function () {
    // (D1) RESET
    cart.hItems.innerHTML = "";
    let item, part, pdt;
    let empty = true;
    for (let key in cart.items) {
      if (cart.items.hasOwnProperty(key)) { empty = false; break; }
    }

    // (D2) CART IS EMPTY
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Cart is empty";
      cart.hItems.appendChild(item);
    }

    // (D3) CART IS NOT EMPTY - LIST ITEMS
    else {
      let p, total = 0, subtotal = 0;

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAI%2BQKAEAAAAAgbmgf9UGDmaJ99nB63jChnWDIvQ%3D1G4f8sWa8jQiIseRSruRuRnq0xxGfLj68X1mX1U4t3MzUAzC10");


      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/products", requestOptions)
        .then(response => response.json())
        .then(result => {


          for (let id in cart.items) {
            // ITEM
            p = id;
            console.log(result);
            item = document.createElement("div");
            item.className = "c-item";
            cart.hItems.appendChild(item);

            // NAME
            part = document.createElement("div");
            part.innerHTML = result.find(x => x.id == p).name;
            part.className = "c-name";
            item.appendChild(part);

            // REMOVE
            part = document.createElement("input");
            part.type = "button";
            part.value = "X";
            part.dataset.id = id;
            part.className = "c-del cart";
            part.addEventListener("click", cart.remove);
            item.appendChild(part);

            // QUANTITY
            part = document.createElement("input");
            part.type = "number";
            part.value = cart.items[id];
            part.dataset.id = id;
            part.className = "c-qty";
            part.addEventListener("change", cart.change);
            item.appendChild(part);

            // SUBTOTAL
            subtotal = cart.items[id] * p.price;
            total += subtotal;
          }

          // EMPTY BUTTONS
          item = document.createElement("input");
          item.type = "button";
          item.value = "Empty";
          item.addEventListener("click", cart.nuke);
          item.className = "c-empty cart";
          cart.hItems.appendChild(item);


          // AUDIENCE LEVELS
          item = document.createElement("input");
          item.type = "button";
          item.value = "Diamond";
          item.addEventListener("click", (function () { this.value = (this.value == "Associate") ? ("Diamond") : ("Associate"); cart.getTotalItem() }));
          item.className = "c-checkout cart";
          cart.hItems.appendChild(item);

          cart.getTotalItem();

        })
        .catch(error => console.log('error', error));





    }
  },

  // (E) ADD ITEM INTO CART
  add: function () {
    if (cart.items[this.dataset.id] == undefined) {
      cart.items[this.dataset.id] = 1;
    } else {
      cart.items[this.dataset.id]++;
    }
    cart.save();
    cart.list();
  },

  // (F) CHANGE QUANTITY
  change: function () {
    if (this.value == 0) {
      delete cart.items[this.dataset.id];
    } else {
      cart.items[this.dataset.id] = this.value;
    }
    cart.save();
    cart.list();
  },

  // (G) REMOVE ITEM FROM CART
  remove: function () {
    delete cart.items[this.dataset.id];
    cart.save();
    cart.list();
  },

  // (H) CHECKOUT
  checkout: function () {
    // SEND DATA TO SERVER
    // CHECKS
    // SEND AN EMAIL
    // RECORD TO DATABASE
    // PAYMENT
    // WHATEVER IS REQUIRED
    alert("TO DO");

    /*
    var data = new FormData();
    data.append('cart', JSON.stringify(cart.items));
    data.append('products', JSON.stringify(products));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "SERVER-SCRIPT");
    xhr.onload = function(){ ... };
    xhr.send(data);
    */
  },

  getTotalItem: function () {
    // CHECKOUT BUTTONS

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    
    const audienceLevel = document.getElementsByClassName("c-checkout cart")[0];
    var audienceLevelId = (audienceLevel.value == "Associate") ? (1) : (2);

    var checkoutItems = [];
    for (let id in cart.items){

        var item  = {"itemId": parseInt(id), "qty": cart.items[id]};

        checkoutItems.push(item);
    }

    console.log(checkoutItems)

  
    var raw = JSON.stringify({ "RecipientLevel": audienceLevelId, "checkoutItems": checkoutItems });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const checkoutButton =  document.getElementsByClassName("c-checkout cart")[1]

    if(checkoutButton){ checkoutButton.remove() }
  

    fetch("http://localhost:3000/api/checkout-items", requestOptions)
      .then(response => response.text())
      .then(result => {
        
        item = document.createElement("input");
        item.type = "button";
        item.value = "Checkout - " + "RM " + result;
        item.addEventListener("click", cart.checkout);
        item.className = "c-checkout cart";
        item.name = "checkout"
        cart.hItems.appendChild(item);
      })
      .catch(error => console.log('error', error));



  }
};
window.addEventListener("DOMContentLoaded", cart.init);