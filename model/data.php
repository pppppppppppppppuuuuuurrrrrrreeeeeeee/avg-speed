<?php
require __DIR__.'/config.php';
// require __DIR__.'/ChromePHP.php';

$startDate = $_POST['startDate'];
$startTime = $_POST['startTime'];
$endDate = $_POST['endDate'];
$endTime = $_POST['endTime'];

$timeQuery = "PassedTime >= '$startDate $startTime' AND PassedTime <= '$endDate $endTime'";

$t0 = (int)$_POST['t0'];
$t1 = (int)$_POST['t1'];
if($t1 > $t0) {
    $ft = $t1;
} else {
    $ft = $t0;
}



function timeConvertor($time) {
    $exp = explode(':', $time);
    return 3600 * $exp[0] + 60 * $exp[1] + $exp[2];
}

function getMabda() {
    global $conn, $timeQuery;
    $all = [];
    ///camera id mabda
    $sql = "SELECT PlateValue, PassedTime, ImageAddress FROM `PassedVehicleRecords` WHERE CameraID = 23343284 AND $timeQuery";
    $res = $conn->query($sql);
    if($res->num_rows > 0) {
        while($row = $res->fetch_assoc()) {
            $all[] =  [$row['PlateValue'], $row['PassedTime'], $row['ImageAddress']];
        }
    }
    return $all;
}


$json = [];
$c = 0;
foreach(getMabda() as $rec) {
    $exp = explode(' ', $rec[1]);
    $plate = $rec[0];
    $date = $exp[0];
    $time = $exp[1];
    $startPic = $rec[2];
    
    ///camera id maqsad 
    $sql = "SELECT PassedTime, ImageAddress FROM `PassedVehicleRecords` WHERE CameraID = 23343285 AND PlateValue = '$plate' AND PassedTime LIKE '$date%'";
    $res = $conn->query($sql);

    if($res->num_rows > 0) {
        while($row = $res->fetch_assoc()) {
            $timeMaq = explode(' ', $row['PassedTime'])[1];

            $mabda = timeConvertor($time);
            $maqsad = timeConvertor($timeMaq);
            $minDiff = $maqsad - $mabda;
            if($minDiff <= $ft and $minDiff > 0) {

                $obj = new stdClass();
                $obj->plate = $plate;
                $obj->date = $date;
                $obj->startTime = $time;
                $obj->startPic = $startPic;
                $obj->endTime = $timeMaq;
                $obj->endPic = $row['ImageAddress'];
                $obj->diff = $minDiff;
                if($minDiff > $t0 and $minDiff < $t1) {
                    $obj->status = 'با ارزش';
                } else if($minDiff <= $t0) {
                    $obj->status = 'جریمه';
                } else {
                    $obj->status = '';
                }

                if($obj->status !== '') {
                    //count and write
                    $c += 1;
                    file_put_contents('../count.txt', $c);
                    //append json
                    $json[] = $obj;
                }
                // ChromePhp::log("$plate    $date     mabda: $time"."     maqsad: "."$timeMaq       min diff : $minDiff".PHP_EOL);
            }
        }
    }
}

echo json_encode($json);
