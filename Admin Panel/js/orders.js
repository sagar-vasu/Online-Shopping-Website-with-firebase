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

const getOrders = async () => {
  await firebase
    .database()
    .ref("orders/")
    .once("value", (snap) => {
      if (snap.exists()) {
        const ordersData = snap.val();
        console.log("!", ordersData);
      } else {
        document.getElementById("orders").innerHTML = "No Orders For Now ):";
      }
    });
};

getUserInfo();
getOrders();
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
