const mytoken = localStorage.getItem("token")
const isAdmin = localStorage.getItem("isAdmin");
const memberContainer = document.getElementById("member-container")
const officerContainer = document.getElementById("officer-container")
if(!mytoken || isAdmin === "false"){
    alert("sorry, only admins can access this page!")
  window.location.href = './loginm.html';
}



const getDocument = () => {
   fetch('/mdocument', {
     headers: {
       'Content-type': 'application/json',
       'Authorization': 'Bearer ' + mytoken
     },
   })
   .then(res => res.json())
       .then(res =>  displayData(res.data))
   .catch(err => console.log('err occured', err));
 }

 function displayData(data) {
   
   const officerArray = data.filter(x => x.user.position === "officer")
   console.log(data)
   console.log(officerArray)


const myImg = document.getElementById("my-img")

    
   
officerArray.forEach(x => {
  console.log(x, "officer")
  const div = document.createElement("div")
   div.innerHTML += `
  <div id="docuContainer">
  <br>

  <div class="info">
   <p>User ID : ${x.user._id} </p>
  <p>User Name : ${x.user.username} </p>
  <p>First Name : ${x.user.firstName} </p>
  <p>Last Name : ${x.user.lastName} </p>
  <p>Adress : ${x.user.address} </p>
  <p>Email : ${x.user.email} </p>
  <p>Password : ${x.user.password} </p>

 </div>

  <div id="docuImgs">
  <p>Documents:  </p>
  <img class="docuImg" src="data:image/png;base64,${x.img1}" />
  <img class="docuImg" src="data:image/png;base64,${x.img2}" />
  <a href="data:application/pdf;base64,${x.img5}" download>
  <href src="data:application/pdf;base64,${x.img5}"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png" height= "80px" width= "60px"></img>
  </iframe>
  
  <br>
  <div>
 
  </div>
  `
  
  officerContainer.append(div)
  
})
  
 }


getDocument()