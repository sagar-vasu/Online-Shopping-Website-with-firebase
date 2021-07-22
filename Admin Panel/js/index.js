firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      var db = firebase.database().ref();
      db.child(`users/${user.uid}`).once("value", (snapshot) => {
        let loggedInUser = snapshot.val();
        loggedInUser.id = snapshot.key;
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        window.location.href = "./pages/Admin.html";
      });
    } else {
      firebase.auth().signOut();
    }
  } else {
    console.log("");
  }
});
let validateUser = (email, password) => {
  if (!email) {
    alert("Please enter email");
  } else if (!password) {
    alert("Please enter password");
  } else {
    return true;
  }
};

let login = async () => {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;
  let verify = validateUser(email, pass);

  if (verify) {
    document.getElementById("login").innerHTML = "Please Wait...";

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((activeUser) => {
        if (activeUser.user.emailVerified) {
          document.getElementById("login").innerHTML = "Let Me In";
          var db = firebase.database().ref();
          db.child(`users/${activeUser.user.uid}`).once("value", (snapshot) => {
            let loggedInUser = snapshot.val();
            loggedInUser.id = snapshot.key;
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            window.location.href = "./pages/Admin.html";
          });
        } else {
          alert("Please Verify Email");
          firebase.auth().signOut();
          window.location.href = "../index.html";
        }
      })
      .catch((error) => {
        document.getElementById("login").innerHTML = "Let Me In";
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
};
