"use strict";

var sharedDateService = (function() {
    var getDateStringFromUTCString = function(utcString) {
        var date = new Date(utcString);
        var now = new Date();
        var todayEnd = new Date();
        todayEnd.setHours(23);
        todayEnd.setMinutes(59);
        todayEnd.setSeconds(59);
        todayEnd.setMilliseconds(999);
        var tomorrowEnd = new Date();
        tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
        tomorrowEnd.setHours(23);
        tomorrowEnd.setMinutes(59);
        tomorrowEnd.setSeconds(59);
        tomorrowEnd.setMilliseconds(999);
        if (now < date) {
            //date to parse is in the future
            if (date <= todayEnd) {
                //date to parse is today
                var time = getTimeStringFromDate(date);
                if(time){
                	return time;
                } else{
                	return "Today";
                }
            } else if (date <= tomorrowEnd) {
                //date to parse is tomorrow
                var time = getTimeStringFromDate(date);
                if(time){
                	return "Tomorrow, " + getTimeStringFromDate(date);
                } else{
                	return "Tomorrow";
                }
                
            }
        }
        return date.toDateString();
    };

    function getTimeStringFromDate(date) {
        var hour = date.getHours();
        var minute = date.getMinutes();
        var pm = false;
        if (hour > 12) {
            if (hour === 23 && minute === 59) {
                return false;
            }
            return hour - 12 + ":" + pad(minute, 2) + " PM";
        } else {
            return hour + ":" + pad(minute, 2) + " AM";
        }
    }

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    var service = {
        getDateStringFromUTCString: getDateStringFromUTCString
    };
    return service;
})();
