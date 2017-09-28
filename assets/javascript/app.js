
//initialize firbase
	var config = {
    	apiKey: "AIzaSyCx90TYhj_8-1TUCvxqtcq1Jp4sHI0L9rY",
		authDomain: "fir-991fa.firebaseapp.com",
		databaseURL: "https://fir-991fa.firebaseio.com",
		projectId: "fir-991fa",
		storageBucket: "fir-991fa.appspot.com",
		messagingSenderId: "262135291988"
  	  };

	firebase.initializeApp(config);

	var database = firebase.database();

	$("#addtrain-btn").on("click", function(event) {
		event.preventDefault();

	//grab user uninput
	var tName = $("#trainname-input").val().trim();
	var tDestination = $("#destination-input").val().trim();
	var	tTime = moment($("#firsttime-input").val().trim(), "HH:mm").format("X");
	var tFrequency = $("#frequency-input").val();


		

// object for holding data
	var newTrain = {
		name: tName,
		destination: tDestination,
		time: tTime,
		frequency: tFrequency
	};

// upload data to DB
	database.ref().push(newTrain);

// Logs everything to console
  console.log(tName.name);
  console.log(tDestination.destination);
  console.log(tTime.time);
  console.log(tFrequency.frequency);

// alert
	alert("Train has been successfully added!");

// clear text box
	$("#trainname-input").val("");
	$("#destination-input").val("");
	$("#firsttime-input").val("");
	$("#frequency-input").val("");

	  });

// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry??
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {
// store into variable
		var tName = childSnapshot.val().name;
		var tDestination = childSnapshot.val().destination;
		var tTime = childSnapshot.val().time;
		var tFrequency = childSnapshot.val().frequency;
	// WHY
	console.log(tName);
	console.log(tDestination);
	console.log(tTime);
	console.log(tFrequency);

// calculate next arrival

	var now = new Date(Date.now());
	var nowFormat = moment(now).format("HH:mm");
	

	var tNext = nowFormat + tFrequency

// calculate minutes away
	
	var tRemain = nowFormat % tFrequency

// add data to table field

	$("#trainSchedule > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
  tNext + "</td><td>" + tFrequency +  "</td><td>" + tRemain +"</td></tr>");

	// $("#trainSchedule > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
 //  tTime + "</td><td>" + tNext + "</td><td>" + tRemain + "</td></tr>");

	});