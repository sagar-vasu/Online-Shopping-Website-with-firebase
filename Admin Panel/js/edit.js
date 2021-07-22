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

var id;
const getProductData = () => {
  let data = localStorage.getItem("product");
  if (data != null) {
    let product = JSON.parse(data);
    id = product.key;
    document.getElementById("productName").value = product.productName;
    document.getElementById("productPrice").value = product.productPrice;
    document.getElementById("productURL").value = product.productURL;
    document.getElementById("productOldPrice").value = product.productOldPrice;
    document.getElementById("productDescription").value =
      product.productDescription;
    document.getElementById("productCategory").value = product.category;
  } else {
    window.location.href = "../pages/Admin.html";
  }
};

getUserInfo();
getProductData();

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

const updateProduct = async () => {
  let productName = document.getElementById("productName").value;
  let productPrice = document.getElementById("productPrice").value;
  let productURL = document.getElementById("productURL").value;
  let productOldPrice = document.getElementById("productOldPrice").value;
  let productDescription = document.getElementById("productDescription").value;
  let productCategory = document.getElementById("productCategory").value;

  let productObj = {
    productName,
    productPrice,
    productURL,
    productOldPrice: productOldPrice ? productOldPrice : null,
    productDescription,
    wishlist: false,
    category: productCategory,
  };

  if (
    productName === "" ||
    productPrice === "" ||
    productURL === "" ||
    productDescription === "" ||
    productCategory === ""
  ) {
    alert("Please Fill Required Fields");
  } else {
    await firebase
      .database()
      .ref(`products/${id}`)
      .update(productObj)
      .then(() => {
        alert("Product Updated");
        window.location.href = "../pages/Admin.html";
      })
      .catch((err) => {
        alert(err.message);
      });
  }
};
