<?php

$mysqli = new mysqli("mysql-user.cse.msu.edu", "slonczti", "A46479597");

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

$dispQuery ="Select language, level from languages";
$dispResult = $mysqli->query($dispQuery);
$fName = Array();
$lName = Array();
$age = Array();

while($row = $dispResult->fetch_array())
{
    $rows[] = $row;
}
foreach($rows as $row )
{
    $language[] = array("value"=>$row['language']);
    $level[] = array("value"=>$row['level']);
}
$results= array("language"=>$language,"level"=>$lName);
echo json_encode($results);


/* close connection */
$mysqli->close();

?>