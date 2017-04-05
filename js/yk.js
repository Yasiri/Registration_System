// the lib used are
// JQuery for accessing the DOM
// Lodash for helpper functions such as "find","redease" ..
// Firebase SDK

// When Document is Read (after loading)
$(document).ready(function () { 

    $("form").submit(function (event) {
        event.preventDefault();
        var inputs = $(this).serializeArray();
        // console.log(inputs);
        var data = Guest(inputs);
        // console.log(data);
        pushDate(data,'guests');
        
        //
        
    });
    
});


// load firebase SDK
$.getScript('https://www.gstatic.com/firebasejs/3.7.5/firebase.js',function(){
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


// return guest obj
function Guest(inputs) {
    return {
        email: getValue('email', inputs),
        first_name: getValue('First_name', inputs),
        surname: getValue('Surname', inputs),
        gender: getValue('Gender', inputs),
        specialty: getValue('Specialty', inputs),
        inst: getValue('Institution', inputs),
        city: getValue('City', inputs),
        mobile: getValue('Mobile_Number', inputs),
        paid:getValue("amount_Paid",inputs),
        wshops: getGroup('wshop', inputs)
        
    };
    console.log(" here vlaue 1");
};

// helpper function to search for input filed and return value;
function getValue(name, inputs) {
    value = _.find(inputs, function (o) {
        return o.name == name;
    });
    if (value)
        return value.value;
    else
        return "";
}

// helpper function to search for group input and return array of values
// ** only used for workshops input since all of them have "wshop" name
function getGroup(name, inputs) {
    return _.reduceRight(inputs, function (res, value, key) {
        
        if (value.name == name)
            res.push(value.value);
        return res;

    }, new Array());
}

//push the obj to data base
function pushDate(date,url){
    // push data to E.g. /guests
    firebase.database().ref(url).push(date)
    .then(function(res){ // if date saved
        console.log("date pushed!");
        // redirect to the badge page after saving data
        window.location="printPadge.html";
    })
    .catch(function(err){ // if error
        console.log("PushDate:"+err);
    })
};