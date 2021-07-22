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

getUserInfo();

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
// Add Details Of Quizz

const addProduct = async () => {
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
      .ref("products")
      .push(productObj)
      .then(() => {
        alert("Product Added");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productURL").value = "";
  document.getElementById("productOldPrice").value = "";
  document.getElementById("productDescription").value = "";
};
