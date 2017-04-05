
$(document).ready(function(){
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
            console.log("Auth checked!!");
        })
        .catch(function (error) { // if fail
            console.log("Auth: " + err.message);
        });

}); // end of getScript
});



// ---------
function search(type) {
    var term = $('#term').val();

    firebase.database().ref('/guests').orderByChild(type).equalTo(term).once('value')
        .then(function (guests) {
             if (guests.val() == null) {
                console.log("not found");
            } else {
            guests.forEach(function(guest){
                fillGuest(guest.val());
                console.log(guest.val());
                return;
            });   
            }
        }).catch(function(err){
            console.log(err);
        })
}

// fill the guest form 

function fillGuest(guest){
    $("#myModal").modal();
    $('#first_name').val(guest.first_name);
    $('#surname').val(guest.surname);
    $('#gender').val(guest.gender);
    $('#institution').val(guest.inst);
    $('#specialty').val(guest.specialty);
    $('#mobile').val(guest.mobile);
    $('#city').val(guest.city);
// mising
// 1 amount paid
// 2 ID
    var workshops = _.reduce(guest.wshops,function(res,next_wshop){
                         return res + next_wshop + "\n";
                    },"");

    $("#wshops").val(workshops);
}

function RedirectStoR() 
{
    window.location="register.html";
}

