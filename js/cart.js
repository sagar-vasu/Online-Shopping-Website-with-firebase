const getUserData = () => {
  let check = localStorage.getItem("products");

  if (check !== null) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("cartValue").style.display = "block";
    document.getElementById("showCards").style.display = "block";
    let data = JSON.parse(check);
    document.getElementById("cartValue").innerHTML = data.length;

    if (data && data.length > 0) {
      data.forEach((element) => {
        let mainCard = document.getElementById("mainContainer");

        let card = document.createElement("div");
        card.setAttribute("class", "row cart-row");
      });
    }
  }
};

getUserData();
