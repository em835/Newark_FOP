const loginForm = document.getElementById("login-form");
const login = (event) => {
  event.preventDefault();
  console.log(loginForm.username.value);
  console.log(loginForm.password.value);
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: loginForm.username.value,
      password: loginForm.password.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      //alert(res.msg);
      console.log(res.token);
      if (res.token) {
        fetch("/me", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + res.token,
          },
          body: JSON.stringify({
            email: res.email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.position) {
              localStorage.setItem("token", res.token);
              localStorage.setItem("userId", res._id);
              localStorage.setItem("firstname", data.firstName);
              localStorage.setItem("position", data.position);
              localStorage.setItem("isAdmin", data.isAdmin);
              alert("login successful!");

              if(data.position === "member"){
              window.location.href = "./member.html"
              }else if(data.position === "officer"){
                window.location.href = "./officer.html"
              }else{
                window.location.href = "./documents.html"
              }
              // {
              //   data.isAdmin === "true"
              //     ? (window.location.href = "./documents.html")
              //     : (window.location.href = "./member.html");
              // }
            }
          })
          .catch((err) => console.log("err occured", err));
      } else if (res.msg) {
        alert(res.msg);
      } else {
        res.errors.forEach((err) => {
          alert(err.msg);
        });
      }
    })
    .catch((err) => console.log("err occured", err));
};

loginForm.addEventListener("submit", login);
