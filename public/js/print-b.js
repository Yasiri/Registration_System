
$(document).ready(function () { 
// load firebase SDK
$.getScript('https://www.gstatic.com/firebasejs/3.7.5/firebase.js', function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDun8bmp-prjoe3NJPbPqHqHrgPjVn89c0",
        authDomain: "event-6d6c7.firebaseapp.com",
        databaseURL: "https://event-6d6c7.firebaseio.com",
        projectId: "event-6d6c7",
        storageBucket: "event-6d6c7.appspot.com",
        messagingSenderId: "216651029511"
    };
    firebase.initializeApp(config);


    // sign in for test user (dummay user)
    email = "test@test.com";
    password = "123456";

    // login process
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (res) { // if secces
            console.log("Auth checked!bb!");
        })
        .catch(function (error) { // if fail
            console.log("Auth: " + err.message);
        });
  
}); // end of getScript
});

var guest_id = window.location.search.slice(1);
    // firebase get guest
   function search() {
    //var term = $('#term').val();

    firebase.database().ref('/guests/'+guest_id).once('value')
        .then(function (guest) {
            console.log(guest);
             if (guest.val() == null) {
                console.log("not found");
            } else {
          
               fillGuest(guest.val());
               generateQR(guest);
               console.log(guest.val());

 
            }
        }).catch(function(err){
            console.log(err);
        })
}
// fill the badge info 
function fillGuest(guest){
    document.getElementById("title").innerHTML = "XXXXX";
    document.getElementById("name").innerHTML = guest.first_name + " " + guest.surname;
    document.getElementById("speci").innerHTML = guest.specialty;
    document.getElementById("inst").innerHTML = guest.inst; 
    document.getElementById("type").innerHTML = guest.gender;    
}


// identify work shops and combine them with 
function generateQR(guest){
   
        var QR_Text = {
            id:guest.key,
            wshops:[1,2,3,4]
        }

        console.log(QR_Text);
        console.log(JSON.stringify(QR_Text));
        const qr = new QRious({
            value:    JSON.stringify(QR_Text)     
        });
        document.getElementById("qrcode").setAttributeNS('http://www.w3.org/1999/xlink','href',qr.toDataURL('image/jpeg'));     
}