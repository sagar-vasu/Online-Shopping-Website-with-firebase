let showProducts = (data) => {
  var totalPrice = 0;
  if (data && data.length > 0) {
    data.forEach((element, i) => {
      let mainCard = document.getElementById("main-Container");
      let tRow = document.createElement("tr");
      let tdImage = document.createElement("td");
      tRow.appendChild(tdImage);
      let main = document.createElement("div");
      main.setAttribute("class", "main");
      tdImage.appendChild(main);
      let flex = document.createElement("div");
      flex.setAttribute("class", "d-flex");
      main.appendChild(flex);
      let image = document.createElement("img");
      image.setAttribute("width", "145");
      image.setAttribute("height", "98");
      image.src = element.productURL;
      flex.appendChild(image);
      let tdTitle = document.createElement("td");
      let title = document.createElement("h5");
      let titleText = document.createTextNode(element.productName);
      title.appendChild(titleText);
      tdTitle.appendChild(title);
      tRow.appendChild(tdTitle);
      let tdPrice = document.createElement("td");
      let price = document.createElement("h6");
      let priceText = document.createTextNode(element.productPrice + " PKR");
      tdPrice.appendChild(price);
      price.appendChild(priceText);
      tRow.appendChild(tdPrice);

      let tdInput = document.createElement("td");
      tRow.appendChild(tdInput);
      let counterDiv = document.createElement("div");
      counterDiv.setAttribute("class", "counter");
      tdInput.appendChild(counterDiv);
      let input = document.createElement("input");
      input.setAttribute("class", "input-number");
      input.setAttribute("type", "text");
      input.setAttribute("min", "1");
      input.setAttribute("max", "20");
      input.value = element.quantity;
      counterDiv.appendChild(input);

      let tdTotal = document.createElement("td");
      let total = document.createElement("h6");
      let totalTxt = document.createTextNode(
        element.productPrice * input.value + " PKR"
      );
      total.appendChild(totalTxt);
      tdTotal.appendChild(total);
      tRow.appendChild(tdTotal);
      let removeTd = document.createElement("td");
      let close = document.createElement("i");
      close.setAttribute("class", "fas fa-trash");
      close.addEventListener("click", () => {
        if (data.length > 1) {
          data.splice(data[i], 1);
          localStorage.setItem("products", JSON.stringify(data));
          tRow.remove();
          document.getElementById("cartValue").innerHTML = data.length;
        } else {
          localStorage.removeItem("products");
          tRow.remove();
          document.getElementById("cartValue").style.display = "none";
          document.getElementById("showCards").style.display = "none";
          document.getElementById("text").innerHTML =
            "No Products Added Yet :)";
        }
      });
      removeTd.appendChild(close);
      tRow.appendChild(removeTd);
      mainCard.appendChild(tRow);
      totalPrice += element.productPrice * element.quantity;
    });

    document.getElementById("total").innerHTML = "Total: " + totalPrice;
  }
};

const getUserData = () => {
  document.getElementById("showCards").style.display = "none";

  let check = localStorage.getItem("products");

  if (check !== null) {
    document.getElementById("showCards").style.display = "block";
    document.getElementById("cartValue").style.display = "block";
    let data = JSON.parse(check);
    document.getElementById("cartValue").innerHTML = data.length;
    showProducts(data);
  } else {
    document.getElementById("text").innerHTML = "No Products Added Yet :)";
  }
};
getUserData();
