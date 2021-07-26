let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");
let header = document.querySelector(".header-2");

menu.addEventListener("click", () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
});

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");

  if (window.scrollY > 150) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

const getUserData = () => {
  let check = localStorage.getItem("products");

  if (check !== null) {
    document.getElementById("cartValue").style.display = "block";
    let data = JSON.parse(check);
    document.getElementById("cartValue").innerHTML = data.length;
  }
};

const getProducts = async () => {
  document.getElementById("showCards").style.display = "none";
  document.getElementById("loader").style.display = "block";
  let id = localStorage.getItem("category");
  if (id !== null) {
    var mainId = JSON.parse(id);
    let allProducts = [];
    await firebase
      .database()
      .ref("products/")
      .once("child_added", (snap) => {
        let data = snap.val();
        data.key = snap.key;
        if (data.category === mainId) {
          allProducts.push(data);
          document.getElementById("loader").style.display = "none";
          document.getElementById("showCards").style.display = "block";
        }
      });
    document.getElementById(
      "categoryName"
    ).innerHTML += ` ${mainId} <span>Products</span>`;

    if (allProducts && allProducts.length > 0) {
      allProducts.forEach((element) => {
        // here you need to create card as in category.html from
        let boxContainer = document.getElementById("box-container");
        let box = document.createElement("div");
        box.setAttribute("class", "box");
        let icons = document.createElement("div");
        icons.setAttribute("class", "icons");
        let icon1 = document.createElement("a");
        icon1.setAttribute("class", "fas fa-heart");
        icons.appendChild(icon1);
        let icon2 = document.createElement("a");
        icon2.setAttribute("class", "fas fa-share");
        icons.appendChild(icon2);
        let icon3 = document.createElement("a");
        icon3.setAttribute("class", "fas fa-eye");
        icons.appendChild(icon3);
        box.appendChild(icons);
        let image = document.createElement("img");
        image.src = element.productURL;
        box.appendChild(image);
        let name = document.createElement("h3");
        let nameText = document.createTextNode(element.productName);
        name.appendChild(nameText);
        box.appendChild(name);
        let stars = document.createElement("div");
        stars.setAttribute("class", "stars");
        let star1 = document.createElement("i");
        star1.setAttribute("class", "fas fa-star");
        stars.appendChild(star1);

        let star2 = document.createElement("i");
        star2.setAttribute("class", "fas fa-star");
        stars.appendChild(star2);

        let star3 = document.createElement("i");
        star3.setAttribute("class", "fas fa-star");
        stars.appendChild(star3);

        let star4 = document.createElement("i");
        star4.setAttribute("class", "fas fa-star");
        stars.appendChild(star4);

        let star5 = document.createElement("i");
        star5.setAttribute("class", "fas fa-star-half-alt");
        stars.appendChild(star5);
        box.appendChild(stars);
        let prices = document.createElement("div");
        prices.setAttribute("class", "price");
        let price = document.createElement("h3");
        let priceText = document.createTextNode(element.productPrice + " PKR");
        price.appendChild(priceText);
        box.appendChild(price);
        let oldPrices = document.createElement("h3");
        oldPrices.setAttribute("id", "old");
        let oldPricestext = document.createTextNode(
          element.productOldPrice
            ? element.productOldPrice + " PKR"
            : " No Old Price"
        );
        oldPrices.appendChild(oldPricestext);
        box.appendChild(oldPrices);
        let quantity = document.createElement("div");
        quantity.setAttribute("class", "quantity");
        let quantityTitle = document.createElement("span");
        let quantityTitleText = document.createTextNode("quantity :");
        quantityTitle.appendChild(quantityTitleText);
        quantity.appendChild(quantityTitle);
        let quantityInput = document.createElement("input");
        quantityInput.setAttribute("type", "number");
        quantityInput.setAttribute("min", "1");
        quantityInput.setAttribute("max", "100");
        quantityInput.setAttribute("value", "1");
        quantityInput.setAttribute("id", "quantity");
        quantity.appendChild(quantityInput);
        let quantityWeight = document.createElement("span");
        let quantityWeightText = document.createTextNode("Kg");
        quantityWeight.appendChild(quantityWeightText);
        quantity.appendChild(quantityWeight);
        box.appendChild(quantity);
        let addToCart = document.createElement("a");
        addToCart.setAttribute("href", "#");
        addToCart.setAttribute("class", "btn");
        addToCart.addEventListener("click", () => {
          element.quantity = quantityInput.value;
          addTocartBtn(element);
        });
        let addToCartText = document.createTextNode("add to cart");
        addToCart.appendChild(addToCartText);
        box.appendChild(addToCart);
        boxContainer.appendChild(box);
      });
    } else {
      document.getElementById("loader").style.display = "none";
      document.getElementById("showCards").style.display = "block";
      document.getElementById("categoryName").innerHTML = "No Products";
    }
  } else {
    window.location.href = "../index.html";
  }
};
getUserData();

getProducts();

const addTocartBtn = (product) => {
  document.getElementById("cartValue").style.display = "block";

  let check = localStorage.getItem("products");

  if (check === null) {
    let allProducts = [];
    allProducts.push(product);
    localStorage.setItem("products", JSON.stringify(allProducts));
    document.getElementById("cartValue").innerHTML = allProducts.length;
  } else {
    let data = JSON.parse(check);

    var flag = true;
    for (var i = 0; i < data.length; i++) {
      if (data[i].key === product.key) {
        flag = false;
        let newQuantity = Number(data[i].quantity) + Number(product.quantity);
        data[i].quantity = newQuantity;
        localStorage.setItem("products", JSON.stringify(data));
        document.getElementById("cartValue").innerHTML = data.length;
      }
    }
    if (flag === true) {
      data.push(product);
      localStorage.setItem("products", JSON.stringify(data));
      document.getElementById("cartValue").innerHTML = data.length;
    }
  }
};
