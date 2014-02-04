<?php
include 'vars.php';
$mysqli = new mysqli($host, $user, $pass,$db);

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
$firstName = 'null';
$lastName = 'null';
$firstName = $_POST['firstname'];
$lastName = $_POST['lastname'];

/* print host information */
//echo "Host info: " . $mysqli->host_info . '<br />';

$forceQuery ="Select source,target,type,value from links";
$forceResult = $mysqli->query($forceQuery);
while($row = $forceResult->fetch_array())
{
    $rows[] = $row;
}
foreach($rows as $row )
{
    $force[] = array("source"=>$row['source'],"target"=>$row['target'],"type"=>$row['type'],"value"=>$row['value']);
}
$forceResult->free();

$dispQuery ="Select firstName,lastName from guests";
$dispResult = $mysqli->query($dispQuery);
$fName = Array();
$lName = Array();

while($row = $dispResult->fetch_array())
{
    $rows[] = $row;
}
foreach($rows as $row )
{
    $name[] = array("firstname"=>$row['firstName'],"lastname"=>$row['lastName']);
}
$results= array("name"=>$name,"forceDiagram"=>$force);
echo json_encode($results);


/* close connection */
$mysqli->close();

?>