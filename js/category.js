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

    allProducts.forEach((element) => {
      // here you need to create card as in category.html from
    });
  } else {
    window.location.href = "../index.html";
  }
};

getProducts();
