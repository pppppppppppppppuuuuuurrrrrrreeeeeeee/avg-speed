function process() {
    let startDate = document.getElementById('startDate').value;
    let startTime = document.getElementById('startTime').value;

    let endDate = document.getElementById('endDate').value;
    let endTime = document.getElementById('endTime').value;

    let t0 = document.getElementById('t0').value;
    let t1 = document.getElementById('t1').value;

    //convert dates
    startDate = startDate.split('/');
    startDate = jalaliToGregorian(startDate[0], startDate[1], startDate[2], '-'); 

    endDate = endDate.split('/');
    endDate = jalaliToGregorian(endDate[0], endDate[1], endDate[2], '-'); 

    $.post('./model/data.php', {
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        t0: t0,
        t1: t1
        // count: count
    }, function(data) {
        jsonData = JSON.parse(data);
        console.log(jsonData);
    });
}