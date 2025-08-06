(function () {
  var calendar = {};

  function getSuffix(number) {
    var lastDigit = number % 10;
    var lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return "th";
    } else {
      if (lastDigit == 1) {
        return "st";
      } else if (lastDigit == 2) {
        return "nd";
      } else if (lastDigit == 3) {
        return "rd";
      } else {
        return "th";
      }
    }
  }

  function updateCalendar(calendar) {
    var now = new Date();

    var weekdate = now.getDay();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    var weekday = days[weekdate];

    var date = now.getDate();

    var suffix = getSuffix(date);

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var monthDate = now.getMonth();
    var month = months[monthDate];

    var timeString = weekday + ", " + date + suffix + " of " + month;
    console.log(timeString);
    calendar.nodeValue = timeString;
    return calendar;
  }

  calendar.mark = function () {
    var timer = document.createElement("span");

    var time = document.createTextNode("");
    timer.appendChild(time);

    timer.timeoutId = setInterval(function () {
      time = updateCalendar(time);
    }, 1000);
    updateCalendar(time);

    return timer;
  };

  calendar.wipe = function (timer) {
    clearInterval(timer.timeoutId);
  };

  marcOS.system.comps.calendar = calendar;
  calendar.mark();
})();
