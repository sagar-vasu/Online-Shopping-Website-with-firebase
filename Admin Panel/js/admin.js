const getUserInfo = () => {
  let user = localStorage.getItem("user");
  if (user != null) {
    let data = JSON.parse(user);
    let first = data.accountType.slice(0, 1).toUpperCase();
    let last = data.accountType.slice(1).toLowerCase();
    document.getElementById("h3").innerHTML += " " + first + last;
  } else {
    window.location.href = "../index.html";
  }
};

const getProducts = async () => {
  document.getElementById("showCards").style.display = "none";
  document.getElementById("loader").style.display = "block";

  let allProducts = [];
  await firebase
    .database()
    .ref("products/")
    .once("child_added", (snap) => {
      let data = snap.val();
      data.key = snap.key;
      allProducts.push(data);
      document.getElementById("loader").style.display = "none";
      document.getElementById("showCards").style.display = "block";
    });

  allProducts.forEach((element) => {
    let mainContainer = document.getElementById("showCards");
    // card

    let mainCard = document.createElement("div");
    mainCard.setAttribute("class", "content");
    let image = document.createElement("img");
    image.src = element.productURL;
    image.setAttribute("id", "productImg");

    let title = document.createElement("h3");
    let titleText = document.createTextNode(element.productName);
    title.appendChild(titleText);

    let description = document.createElement("p");
    let descriptionText = document.createTextNode(element.productDescription);
    description.setAttribute("id", "productDescription");
    description.appendChild(descriptionText);

    let boxRow = document.createElement("div");
    boxRow.setAttribute("id", "row");

    let price = document.createElement("h6");
    let priceText = document.createTextNode(element.productPrice + " PKR");
    price.appendChild(priceText);

    let oldPrice = document.createElement("h6");
    let oldPriceText = document.createTextNode(
      element.productOldPrice ? element.productOldPrice + " PKR" : ""
    );
    oldPrice.setAttribute("id", "old");
    oldPrice.appendChild(oldPriceText);

    boxRow.appendChild(oldPrice);
    boxRow.appendChild(price);

    let editButton = document.createElement("button");
    let editButtonText = document.createTextNode("Edit Item");
    editButton.appendChild(editButtonText);
    editButton.setAttribute("class", "buy-2");
    let deleteButton = document.createElement("button");
    let deleteButtonText = document.createTextNode("Delete Item");
    deleteButton.setAttribute("class", "buy-2");
    deleteButton.appendChild(deleteButtonText);

    editButton.addEventListener("click", () => {
      localStorage.setItem("product", JSON.stringify(element));
      window.location.href = "../pages/Edit.html";
    });

    deleteButton.addEventListener("click", () => {
      deleteBtn(element.key);
    });

    mainCard.appendChild(image);
    mainCard.appendChild(title);
    mainCard.appendChild(description);
    mainCard.appendChild(boxRow);
    mainCard.appendChild(editButton);
    mainCard.appendChild(deleteButton);
    mainContainer.appendChild(mainCard);
  });
};

getUserInfo();
getProducts();

let deleteBtn = (id) => {
  firebase
    .database()
    .ref(`products/${id}`)
    .remove()
    .then(() => {
      alert("product removed");
      window.location.reload();
    });
};

let logout = async () => {
  await firebase
    .auth()
    .signOut()
    .then(() => {
      alert("User Logged out");
      localStorage.removeItem("user");
      window.location.href = "../index.html";
    })
    .catch((err) => {
      alert(err.message);
    });
};
