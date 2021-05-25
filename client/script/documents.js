const mytoken = localStorage.getItem("token")
const isAdmin = localStorage.getItem("isAdmin");
const memberContainer = document.getElementById("member-container")
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
   
   const memberArray = data.filter(x => x.user.position === "member")
 
   console.log(data)
   console.log(memberArray)



const myImg = document.getElementById("my-img")

    //myImg.innerHTML = `<img src="data:image/png;base64,${data[0].img1}" />`
    memberArray.forEach(x => {
      const div = document.createElement("div")
      div.classList.add("docu");
       div.innerHTML += `
      <div id="docuContainer">
    
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
      <img class="docuImg" src="data:image/png;base64,${x.img3}" />

      <iframe src="data:application/pdf;base64,${x.img4}"> </iframe>
      <iframe src="data:application/pdf;base64,${x.img5}"> </iframe>
      <br>
      <div>
     
      </div>
      `
      
      memberContainer.append(div)
      
})

  
 }


getDocument()