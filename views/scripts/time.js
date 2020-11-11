////////date
kamaDatepicker('startDate',  {
    buttonsColor: "red",
    markToday: true,
    markHolidays: true,
    sync: true
});
kamaDatepicker('endDate',  {
    buttonsColor: "red",
    markToday: true,
    markHolidays: true,
    sync: true
});
///////////clock
$('#startTime').clockpicker({
    autoclose: true
});
$('#endTime').clockpicker({
    autoclose: true
});


//////////prest values ~ 24 hours ago
let startDate = getNPassedDate(1);
let stopDate = getCurrentDate();
let stopTime = getCurrentTime();

stopTime = stopTime.slice(0, 5);

document.getElementById("startDate").value = startDate;
document.getElementById("endDate").value = stopDate;
document.getElementById("startTime").value = stopTime;
document.getElementById("endTime").value = stopTime;
