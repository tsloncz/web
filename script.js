$( document ).ready(function(){
	//initialize tabs when page first loads
	$( "#tabs" ).tabs();

    //force diagram
    var links = [
  {source: "Me", target: "Platforms", type: "main"},
  {source: "Me", target: "Languages", type: "main"},
  {source: "Me", target: "Interests", type: "main"},
  {source: "Interests", target: "Web Apps", type: "main"},
  {source: "Interests", target: "Big Data", type: "main"},
  {source: "Platforms", target: "Mac", type: "sub"},
  {source: "Platforms", target: "Linux", type: "sub"},
  {source: "Platforms", target: "Windows", type: "sub"},
  {source: "Languages", target: "C++", type: "language"},
  {source: "Languages", target: "Python", type: "language"},
  {source: "Languages", target: "PHP", type: "language"},
  {source: "Languages", target: "CSS", type: "language"},
  {source: "Languages", target: "JavaScript", type: "language"}
];

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

var width = 660,
    height = 400;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(60)
    .charge(-300)
    .on("tick", tick)
    .start();

var svg = d3.select("#aboutMe").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link")
    .data(force.links())
  .enter().append("line")
    .attr("class", "link");

var node = svg.selectAll(".node")
    .data(force.nodes())
  .enter().append("g")
    .attr("class", "node")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .call(force.drag);

node.append("circle")
    .attr("r", 8);

node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

function tick() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

function mouseover() {
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 16);
}

function mouseout() {
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 8);
}


});


//calendar
var clientId = '131607012182-sh7foh8q2r7hniu03jeeenrrjhrahmse.apps.googleusercontent.com';
var apiKey = 'AIzaSyCBUxdJ_WJNK_jfIRdDqLE6o-06qrKUi6E';
var scopes = 'https://www.googleapis.com/auth/calendar';

//3 predefined reminders
var bigReminder ={
"reminders": {
    "useDefault": false,
    "overrides": [
      {
        "method": "email",
        "minutes": "2880"
      },
      {
        "method": "email",
        "minutes": "5760"
      },
      {
        "method": "email",
        "minutes": "10080"
      }
    ]
  }
}

var littleReminder ={
"reminders": {
    "useDefault": false,
    "overrides": [
      {
        "method": "email",
        "minutes": "1440"
      },
      {
        "method": "popup",
        "minutes": "120"
      }
    ]
  }
}

var removeReminder ={
"reminders": {
    "useDefault": false,
    "overrides": null
}
}
        
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult) {
    //authorizeButton.style.visibility = 'hidden';
      //checkExists();
      //addReminder();
    //makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
   }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}

//Test api call - works
function makeApiCall() {
  gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary'
    });
      request.execute(function(resp) {
          console.log( resp );
          var results = document.createElement('div');
          results.appendChild(document.createTextNode( "Your primary calendar contains " + resp.items.length + " events."));
          document.getElementById('total').appendChild(results);
  });
});
}

 // FUNCTION TO INSERT EVENT
   function insertEvent() {
   	var resource = {
        "summary":"Test Event",
        "location": "Under there",
	    "description": "Doing neat stuff",
        "start": {
          "dateTime": "2014-01-08T10:00:00-04:00"  //if not an all day event, "date" should be "dateTime" with a dateTime value formatted according to RFC 3339
        },
        "end": {
          "dateTime": "2014-01-08T12:00:00-04:00"  //if not an all day event, "date" should be "dateTime" with a dateTime value formatted according to RFC 3339
        }
      };
     gapi.client.load('calendar', 'v3', function() {  
       var request = gapi.client.calendar.events.insert({
         'calendarId': 'primary',
	   'resource': resource
       });
     request.execute(function(resp) {
       console.log(resp);
	   if (resp.id){
	   	 alert("Event was successfully added to the calendar!");
	   }
	   else{
	   	alert("An error occurred. Please try again later.")
	   }
       
     });
     });
   } 
   // END INSERTEVENT FUNCTION

 // FUNCTION TO ADD REMINDERS
 //Inputs: event id-string reminder-json object
   function addReminder( id, reminder) {
     gapi.client.load('calendar', 'v3', function() {  
       var request = gapi.client.calendar.events.patch({
         'calendarId': 'primary',
         'eventId': id,
	     'resource': reminder
       });
     request.execute(function(resp) {
       console.log(resp);
	   if (resp.id){
	   	 console.log("Reminder was successfully added to: " + resp.summary);
	   }
	   else{
	   	console.log("Reminder fail. An error occurred with: " + resp.summary)
	   }
       
     });
     });
   } 
   // END REMINDERS FUNCTION
    
 // FUNCTION TO DELETE EVENT
 //Inputs: event id-string
   function deleteEvent(id) {
     gapi.client.load('calendar', 'v3', function() {  
       var request = gapi.client.calendar.events.delete({
         'calendarId': 'primary',
         'eventId': id
       });
     request.execute(function(resp) {
         console.log( resp );
	 	if (typeof resp === 'undefined') {
			alert("Event was successfully removed from the calendar!");
		}
		else{
			alert('An error occurred, please try again later.')
		}
     });
     });
   } 
   // END DELETEEVENT FUNCTION	

 // LIST AVAILABLE CALENDARS THAT HAVE WRITE ACCESS
     function listWritableCalendars() {
		  gapi.client.load('calendar', 'v3', function() {
		  var request = gapi.client.calendar.calendarList.list({
                  'minAccessRole': 'writer'
                  });
			request.execute(function(resp) {
			
			});
		  });
		}
 // END LIST CALENDARS FUNCTION

// eventStats FUNCTION
function eventStats(){
    var total = 0;
    var query = $( "#query" ).val();
    console.log(query);
    $('#content').empty();
	gapi.client.load('calendar', 'v3', function() {  
          var request = gapi.client.calendar.events.list({
	   	 'calendarId': 'primary',
          'q': query //set the query string variable
          });
	request.execute(function(resp) {
		console.log(resp);
	   if (resp.items){
		 for (var i = 0; i < resp.items.length; i++) {
		 	//set event variables and list matching events
             console.log(resp.items[i].summary + " " +query);
             //double check returned values to be sure they contain query string in a
             //case sensitive way.
             if(resp.items[i].summary.toLowerCase().search(query.toLowerCase()) !== -1 )
             {
                total += 1;
             }
         }
           $('#eventStatsResult').empty().append("Query for <span><font color='#dc651e'>" + query+"</font></span> matched: <span><font color='#dc651e'>" + total + " </font></span>events.");
	   }
	   else{
			alert("No matching events!");
	   }
         });
	 });
}
// END eventStats FUNCTION

// QUERY EXISTING EVENTS FUNCTION
function massReminder(){
    var query = $( "#reminderQuery" ).val();
    if( $( "input:radio[name=reminder]:checked" ).val() == 'big')
        var reminder = bigReminder;
    else if( $( "input:radio[name=reminder]:checked" ).val() == 'little')
        var reminder = littleReminder;
    else
        var reminder = removeReminder;
    var total = 0;
    
	gapi.client.load('calendar', 'v3', function() {  
          var queryRequest = gapi.client.calendar.events.list({
	   	 'calendarId': 'primary',
          'q': query //set the query string variable
          });
	queryRequest.execute(function(queryResp) {
	   if (queryResp.items){
		 for (var i = 0; i < queryResp.items.length; i++) {
		 	//set event variables and list matching events
             var id = queryResp.items[i].id;
             //double check returned values to be sure they contain query string in a
             //case sensitive way.
             if(queryResp.items[i].summary.toLowerCase().search(query.toLowerCase()) !== -1 )
             {
                 addReminder( id, reminder );
                 total += 1;
             }
         }
           
    $('#reminderResults').empty().append("Added <span><font color='#dc651e'>"+$( "input:radio[name=reminder]:checked" ).val()+"</font></span> reminder to <span><font color='#dc651e'>" + total+"</font></span> events matching <span><font color='#007dc5'>" + query + ".</font></span>");
	   }
	   else{
			alert("No matching events!");
	   }
         });
	 });
}
// END QUERY EVENTS FUNCTION

// QUERY EXISTING EVENTS FUNCTION
function checkExists(){
    var query = $( "#query" ).val();
    console.log(query);
    $('#content').empty();
	gapi.client.load('calendar', 'v3', function() {  
          var request = gapi.client.calendar.events.list({
	   	 'calendarId': 'primary',
          'q': query //set the query string variable
          });
	request.execute(function(resp) {
		console.log(resp);
	   if (resp.items){
		 for (var i = 0; i < resp.items.length; i++) {
		 	//set event variables and list matching events
             console.log(resp.items[i].summary + " " +query);
             //double check returned values to be sure they contain query string in a
             //case sensitive way.
             if(resp.items[i].summary.toLowerCase().search(query.toLowerCase()) !== -1 )
             {
                var event = document.createElement('div');
                 event.id = "calEvent";
                var id = document.createElement('ul');
                var ul = document.createElement('ul');
                id.appendChild(document.createTextNode("Id: " + resp.items[i].id));
                //ul.appendChild(document.createTextNode("Reminders: " + resp.items[i].reminders.overrides[].method));
                event.appendChild(document.createTextNode(resp.items[i].summary));
                event.appendChild(id);
                event.appendChild(ul);
                document.getElementById('content').appendChild(event);
             }
         }
	   }
	   else{
			alert("No matching events!");
	   }
         });
	 });
}
// END QUERY EVENTS FUNCTION