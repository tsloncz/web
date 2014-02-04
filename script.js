
var id;
var key;
var scopes
$( document ).ready(function(){
    //gather required db connection variables from sources
    $.getJSON( "vars.json", function( data ) {
        id = data.id;
        key = data.key;
        scopes = data.scopes;
        console.log(id+" "+key+" "+scopes);
    });
    $.getJSON( "insert.php", function( data ) {
            console.log(data.forceDiagram);
            createMeForceDb(data);
        });//end .done
    //createMeForceLocal();
	//initialize tabs when page first loads
	//$( "#tabs" ).tabs();
    simpleGlobe();
    $( "#accordion" ).accordion();
    //Open Resume
    /*$("#resumeDiv").load('TimothySlonczResume.htm');*/
   

});//end document on ready ****************************


//Creates force diagram of my data from db
function createMeForceDb(json)
{
    var vals = [];
    $.each(json.forceDiagram, function(i){
        vals[i] = this.value;
    })
    console.log(vals);
//var json = jQuery.parseJSON(data);
var links = json.forceDiagram;
    console.log("Links: " +links);
var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
  link.level = nodes[link.level] || (nodes[link.level] = {name: link.level});
});

var width = 760,
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
    .attr("class", function(d){ return "node";})
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .call(force.drag);

node.append("circle")
    .data(vals)
    .attr("r",  function(d) {var x=d*2;console.log(x);return x; });

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

}


//Creates force diagram of my data(static data)
function createMeForce()
{
     var education = "MSU";

    //force diagram
    var links = [
  {source: "Me", target: "Platforms", type: "main"},
  {source: "Me", target: "Languages", type: "main"},
  {source: "Me", target: "Interests", type: "main"},
  {source: "Me", target: education, type: "main"},
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

var width = 760,
    height = 400;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(60)
    .charge(-300)
    .on("tick", tick)
    .start();
    alert(force.nodes);

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

}


//calendar

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
  gapi.client.setApiKey(key);
  window.setTimeout(checkAuth,1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: id, scope: scopes, immediate: true},
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
      {client_id: id, scope: scopes, immediate: false},
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

//Create Globe
function createGlobe()
{
    
    var width = 960,
    height = 500;

var projection = d3.geo.orthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

var λ = d3.scale.linear()
    .domain([0, width])
    .range([-180, 180]);

var φ = d3.scale.linear()
    .domain([0, height])
    .range([90, -90]);

var svg = d3.select("#globeDiv").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.on("mousemove", function() {
  var p = d3.mouse(this);
  projection.rotate([λ(p[0]), φ(p[1])]);
  svg.selectAll("path").attr("d", path);
});

d3.json("world-110m.json", function(error, world) {
  svg.append("path")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);
});
}

//polygon Globe
function polygonGlobe()
{
    var width = 600,
    height = width;

var projection = d3.geo.orthographic()
    .translate([width / 2, height / 2])
    .scale(295)
    .clipAngle(90)
    .precision(.1)
    .rotate([0, -30]);
    // There is a clipping bug, fixed in branch geo-clip-good
    //.rotate([-103.5, -20, 0]);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule()();

var svg = d3.select("#globe").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.drag()
      .origin(function() { var rotate = projection.rotate(); return {x: 2 * rotate[0], y: -2 * rotate[1]}; })
      .on("drag", function() {
        projection.rotate([d3.event.x / 2, -d3.event.y / 2, projection.rotate()[2]]);
        svg.selectAll("path").attr("d", path);
      }));

var hatch = svg.append("defs").append("pattern")
    .attr("id", "hatch")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", 8)
    .attr("height", 8)
  .append("g");
hatch.append("path").attr("d", "M0,0L8,8");
hatch.append("path").attr("d", "M8,0L0,8");

svg.append("path")
    .datum({type: "Sphere"})
    .attr("class", "background")
    .attr("d", path);

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

svg.append("path")
    .datum({type: "LineString", coordinates: [[180, -90], [180, 0], [180, 90]]})
    .attr("class", "antimeridian")
    .attr("d", path);

svg.append("path")
    .datum({type: "Sphere"})
    .attr("class", "graticule")
    .attr("d", path);

d3.json("world-110m.json", function(error, world) {
  var country = svg.selectAll(".country")
      .data(topojson.feature(world, world.objects.countries).features)
    .enter().append("g")
      .attr("class", "country");
  country.append("path")
      .attr("class", "land")
      .attr("d", path);
  country.append("path")
      .datum(boundsPolygon(d3.geo.bounds))
      .attr("class", "bounds")
      .attr("d", path);
});

function boundsPolygon(b) {
  return function(geometry) {
    var bounds = b(geometry);
    if (bounds[0][0] === -180 && bounds[0][1] === -90 && bounds[1][0] === 180 && bounds[1][1] === 90) {
      return {type: "Sphere"};
    }
    if (bounds[0][1] === -90) bounds[0][1] += 1e-6;
    if (bounds[1][1] === 90) bounds[0][1] -= 1e-6;
    if (bounds[0][1] === bounds[1][1]) bounds[1][1] += 1e-6;

    return {
      type: "Polygon",
      coordinates: [
        [bounds[0]]
          .concat(parallel(bounds[1][1], bounds[0][0], bounds[1][0]))
          .concat(parallel(bounds[0][1], bounds[0][0], bounds[1][0]).reverse())
      ]
    };
  };
}

function parallel(φ, λ0, λ1) {
  if (λ0 > λ1) λ1 += 360;
  var dλ = λ1 - λ0,
      step = dλ / Math.ceil(dλ);
  return d3.range(λ0, λ1 + .5 * step, step).map(function(λ) { return [normalise(λ), φ]; });
}

function bounds2d(d) {
  var x0, y0, x1, y1;
  x1 = y1 = -(x0 = y0 = Infinity);
  d3.geo.stream(d, {
    point: function(x, y) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    },
    lineStart: noop,
    lineEnd: noop,
    polygonStart: noop,
    polygonEnd: noop
  });
  return [[x0, y0], [x1, y1]];
}

function noop() {}

(function() {

var width = 300,
    height = width / 2;

var circle = d3.geo.circle();

var projection = d3.geo.equirectangular()
    .translate([width / 2, height / 2])
    .scale(width / (2 * Math.PI) - 2)
    .precision(.1);

var path = d3.geo.path()
    .pointRadius(1)
    .projection(projection);

var example = d3.selectAll(".example")
    .data([
      {type: "MultiPoint", coordinates: d3.range(20).map(function() { return [normalise(160 + 40 * Math.random()), 45 * Math.random()]; })},
      {type: "LineString", coordinates: [[150, 10], [-150, 0]]},
      {type: "LineString", coordinates: [[-45, 45], [45, 45]]},
      circle.origin([180, 0]).angle(150)(),
      {type: "Polygon", coordinates: [
        [[-60, -30], [60, -30], [180, -30], [-60, -30]],
        [[-60, -60], [180, -60], [60, -60], [-60, -60]]
      ]},
      {type: "Polygon", coordinates: [
        [[-60, -30], [60, -30], [180, -30], [-60, -30]]
      ]}
    ])
  .selectAll("svg")
    .data(function(d) {
      return [bounds2d, d3.geo.bounds].map(function(bounds) {
        return {bounds: boundsPolygon(bounds)(d), object: d};
      });
    })
  .enter().append("svg")
    .attr("width", width)
    .attr("height", height + 15);

example.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + [width / 2, height] + ")")
    .attr("dy", "1em")
    .text(function(_, i) { return (i ? "Correct" : "Naïve 2D") + " Algorithm"; });

example.append("path")
    .datum(function(d) { return d.object; })
    .attr("class", function(d) { return "feature " + d.type; })
    .attr("d", path);

example.append("path")
    .datum(function(d) { return d.bounds; })
    .attr("class", "bounds")
    .attr("d", path);

example.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

example.append("path")
    .datum({type: "Sphere"})
    .attr("class", "outline")
    .attr("d", path);

d3.select("#inside").append("svg")
    .attr("width", 16)
    .attr("height", 16)
  .append("rect")
    .style("fill", "url(#hatch)")
    .style("stroke", "#000")
    .style("stroke-width", "2px")
    .attr("width", 16)
    .attr("height", 16);

})();

function normalise(x) {
  return (x + 180) % 360 - 180;
}
    
}

function simpleGlobe()
{
    var width = 960,
    height = 500,
    rotate = [10, -10],
    velocity = [.003, -.001],
    time = Date.now();

var projection = d3.geo.orthographic()
    .scale(240)
    .translate([width / 2, height / 2])
    .clipAngle(90 + 1e-6)
    .precision(.3);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

var svg = d3.select("#globe").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.drag()
      .origin(function() { var rotate = projection.rotate(); return {x: 2 * rotate[0], y: -2 * rotate[1]}; })
      .on("drag", function() {
        projection.rotate([d3.event.x / 2, -d3.event.y / 2, projection.rotate()[2]]);
        svg.selectAll("path").attr("d", path);
      }));

svg.append("path")
    .datum({type: "Sphere"})
    .attr("class", "sphere")
    .attr("d", path);

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

svg.append("path")
    .datum({type: "LineString", coordinates: [ [-180,0],[-90,0]]})
    .attr("class", "equator")
    .attr("d", path)
.append("text")
    .attr("y", 6)
    .text("Equator");
    
//attempt polygon
 svg.append("path")
    .datum({type: "Polygon", coordinates: [
        [ [0,-90],[0,90],[90,0],[0,0] ]
       /*[[-90, 0], [-180, 0],[0,-90],[-180,0]]*/
      ]})
    .attr("class","polygon")
    .style("fill","red")
    .style("stroke","blue")
    .attr("d",path);

var feature = svg.selectAll("path");
/*
d3.timer(function() {
  var dt = Date.now() - time;
  projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1] * dt]);
  feature.attr("d", path);
});*/
    
}
