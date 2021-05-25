const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

if(!token){
  window.location.href = './loginm.html';
}

function logout () {
  localStorage.clear()
  window.location.reload()
}

// if(role !== "admin"){
//   window.location = "./userProfile.html"
// }