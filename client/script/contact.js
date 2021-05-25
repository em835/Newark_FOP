
const contactName = document.getElementById("name")
const email = document.getElementById("email")
const message = document.getElementById("message")
const form = document.getElementById("contact")



const submit = (e) => {
    e.preventDefault();
    fetch("/contact", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          contactName: contactName.value,
          email: email.value,
          message: message.value
        }),
      })
        .then((res) => res.json())
        // .then(res => {
        //   if(res.msg === "success"){
        //     alert(res.msg)
        //   }
       // }
        alert("success")
       contactName.value =""
       message.value = ""
       email.value = ""
}


 form.addEventListener("submit", submit)

