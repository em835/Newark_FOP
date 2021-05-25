const newPasswordForm = document.getElementById("newpassword-form")
const password = document.getElementById("password")

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('param');
const newPassword = event => {
    event.preventDefault()
    fetch('/new-password', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
          password: password.value,
          token : myParam
      })
    })
    .then(res => res.json())
    .then(res => {
        alert(res.message)
        window.location = 'loginm.html'
    })
    .catch(err => console.log('err occured', err));
  }

 

console.log(myParam, "param");
  
  newPasswordForm.addEventListener ('submit', newPassword);