

  var config = {
    apiKey: "AIzaSyCJnqmcs8l_JSo34JUPIn8Bz74u50LaPUA",
    authDomain: "fir-project-2a2e1.firebaseapp.com",
    databaseURL: "https://fir-project-2a2e1.firebaseio.com",
    projectId: "fir-project-2a2e1",
    storageBucket: "fir-project-2a2e1.appspot.com",
    messagingSenderId: "56948136656"
  };
  
  firebase.initializeApp(config);
  
  var dataRef = firebase.database();

var name = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;
var minAway;
var arrival;


$("#submit").on("click", function(event) {
  event.preventDefault();

  name = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#firstTrain").val().trim();
  frequency = $("#frequency").val().trim();


  dataRef.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });

  $(this).closest('form').find("input[type=text], textarea").val('');

});

dataRef.ref().on("child_added", function(snapshot) {

    
    var convertedTime = moment(snapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diff = moment().diff(moment(convertedTime), "minutes");
    var timeRemainder = diff % snapshot.val().frequency;
    arrival = moment(moment().add(minAway, "minutes")).format("LT");
    minAway = snapshot.val().frequency - timeRemainder;

  
    let trainInfo = $('<tr>');
    trainInfo.append(`<td>${snapshot.val().name}</td>`);
    trainInfo.append(`<td>${snapshot.val().destination}</td>`);
    trainInfo.append(`<td>${snapshot.val().frequency}</td>`);
    trainInfo.append(`<td>${arrival}</td>`);
    trainInfo.append(`<td>${minAway}</td>`);

    $('#trainTable').append(trainInfo);

}, function(errorObject) {

  console.log("ERRORS: " + errorObject.code);

});
