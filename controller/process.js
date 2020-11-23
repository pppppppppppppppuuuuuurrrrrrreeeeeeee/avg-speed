function setCount(x) {
    document.getElementById('toastCount').innerHTML = `<b>${x}</b> رکورد یافت شد  !`;
}

function process() {
    var si;

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

    //active toast count and deactive content
    document.getElementById('toast').classList.remove('hide');
    document.getElementById('toast').classList.add('show');

    document.getElementById('content').classList.remove('show');
    document.getElementById('content').classList.add('hide');

    $.post('./model/data.php', {
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        t0: t0,
        t1: t1
    }, function(data) {
        clearInterval(si);
        //active content and deactive toast
        document.getElementById('content').classList.remove('hide');
        document.getElementById('content').classList.add('show');

        document.getElementById('toast').classList.remove('show');
        document.getElementById('toast').classList.add('hide');

        jsonData = JSON.parse(data);
        console.log(jsonData);
    });


    si = setInterval(function(){
        $.get('./count.txt', function(data) {
            setCount(data);
        });
    }, 2000);
}