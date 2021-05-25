const forgotForm = document.getElementById("forgot-form")
const email = document.getElementById("email")

const forgot = event => {
    event.preventDefault()
  
    fetch('/reset-password', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
          email: email.value
      })
    })
    .then(res => res.json())
    .then(res => alert(res.message))
    .catch(err => console.log('err occured', err));
  }
  
  forgotForm.addEventListener ('submit', forgot);