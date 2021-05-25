const regForm = document.getElementById("regForm");
const myPassord = document.getElementById("mypassword");
const matcherror = document.getElementById("error")
const matcherror2 = document.getElementById("error2")
const password = document.getElementById("password")


const register = (event) => {
  event.preventDefault();
  const passwordValue = password.value.trim()
  if (regForm.password.value !== regForm.password_c.value) {
    matcherror2.innerText = "passwords don't match";
  }
   else if(!isPassword(passwordValue)){
 matcherror.innerText = "password must be at least 7 characters, 1 num, 1 uppercase and a special char"
  }
  else {
     matcherror2.innerText = "";
    matcherror.innerText = "";

    fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName: regForm.firstName.value,
        lastName: regForm.lastName.value,
        username: regForm.userName.value,
        email: regForm.email.value,
        address: regForm.address.value,
        password: regForm.password.value,
        position: document.querySelector('input[name="position"]:checked').value
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        //alert(res.msg);
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
                alert("Account created successfully!");
                {
                  data.position === "member"
                    ? (window.location.href = "./member.html")
                    : (window.location.href = "./officer.html");
                }
          
              }
            })
            .catch((err) => console.log("err occured", err));
        } else if (res.msg) {
          alert("Email exists, please enter another");
        } else {
          res.errors.forEach((err) => {
            alert(err.msg);
          });
        }
      })
      .catch((err) => console.log("err occured", err));
  }
};

function isPassword (val) {
  console.log("this is val", val)
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,}$/.test(val);
}




regForm.addEventListener("submit", register);
