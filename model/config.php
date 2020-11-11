<?php
$host = "localhost";
$username = "root";
$database = "MonitoringAnpr";
$password = "Anpr@1234";

$conn = new mysqli($host, $username, $password, $database);
$conn -> set_charset("utf8");
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
