function jalaliToGregorian(jy, jm, jd, separator) {
    jy = Number(jy);
    jm = Number(jm);
    jd = Number(jd);
    var sal_a, gy, gm, gd, days, v;
    if (jy > 979) {
        gy = 1600;
        jy -= 979;
    } else {
        gy = 621;
    }
    days = 365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4) + 78 + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
    gy += 400 * parseInt(days / 146097);
    days %= 146097;
    if (days > 36524) {
        gy += 100 * parseInt(--days / 36524);
        days %= 36524;
        if (days >= 365) days++;
    }
    gy += 4 * parseInt(days / 1461);
    days %= 1461;
    if (days > 365) {
        gy += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }
    gd = days + 1;
    sal_a = [0, 31, (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (gm = 0; gm < 13; gm++) {
        v = sal_a[gm];
        if (gd <= v) break;
        gd -= v;
    }
    if (separator == "array") {
        return [gy, gm, gd];
    } else {
        var resultM = gm < 10 ? "0" + gm.toString() : gm.toString();
        var resultD = gd < 10 ? "0" + gd.toString() : gd.toString();
        return gy + separator + resultM + separator + resultD;
    }
}

function gregorian_to_jalali(gy, gm, gd) {
    let g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let jy;
    if (gy > 1600) {
        jy = 979;
        gy -= 1600;
    } else {
        jy = 0;
        gy -= 621;
    }
    let gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * (parseInt(days / 12053));
    days %= 12053;
    jy += 4 * (parseInt(days / 1461));
    days %= 1461;
    if (days > 365) {
        jy += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }
    let jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
    let jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    let resultY = jy;
    let resultM = jm < 10 ? "0" + jm.toString() : jm.toString();
    let resultD = jd < 10 ? "0" + jd.toString() : jd.toString();
    var today = resultY + '/' + resultM + '/' + resultD;
    return today;
}

function getNPassedDate(n) {
    var today = new Date();
    today.setDate(today.getDate() - n);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    return gregorian_to_jalali(yyyy, mm, dd);
}

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    return gregorian_to_jalali(yyyy, mm, dd);
}

function getCurrentTime() {
var today = new Date();
var hh = today.getHours();
var mm = today.getMinutes();
var ss = today.getSeconds();
if (hh < 10)
    hh = '0' + hh;
if (mm < 10)
    mm = '0' + mm;
if (ss < 10)
    ss = '0' + ss;
return hh + ':' + mm + ':' + ss;
}
