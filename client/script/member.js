const memberForm = document.getElementById("member-form");
const fileToUpload = document.getElementById("fileToUpload");
const user= localStorage.getItem("userId")
const mytoken = localStorage.getItem("token")
const firstname = localStorage.getItem("firstname")
const username = document.getElementById("username")


const position = localStorage.getItem("position");

if(!mytoken || position !== "member"){
   // alert("sorry, only officers can access this page!")
  window.location.href = './loginm.html';
}

let img1 = ''
let img2 = ''
let img3 = ''
let img4 = ''
let img5 =''
  
 
window.addEventListener('load', () => {
username.innerText = `Welcome ${firstname}!`
})

var handleFileSelect = function (img, evt) {
    var files = evt.target.files;
    var file = files[0];
   // console.log(file, "file< =====")
    if (files && file) {
      var reader = new FileReader();
      reader.onload = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        var encoded = btoa(binaryString);

       switch(img) {
        case "img1":
           img1 = encoded
          break;
        case "img2":
         img2 = encoded
          break;
          case "img3":
            img3 = encoded
             break;
             case "img4":
              img4 = encoded
               break;
               case "img5":
                img5 = encoded
                 break;
        default:
          encoded
      }
      };
      reader.readAsBinaryString(file);
    
    }
  };

const postDocument = e => {
    e.preventDefault()
   console.log(img1, img2)
    fetch('/mdocument', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + mytoken
      },

      body: JSON.stringify({
         img1,
         img2,
         img3,
         img4,
         img5,
         user
      })
    })
    .then(res => res.json())
        .then(res =>  alert(res.msg))
    .catch(err => console.log('err occured', err));
  }



memberForm.addEventListener ('submit', postDocument)
