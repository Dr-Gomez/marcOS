(function () {
  var clock = {};

  function padZero(num) {
    if (num < 10) {
      num.toString();
      num = "0" + num;
    } else {
      num.toString();
    }

    return num;
  }

  function updateClock(clock) {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    var timeString =
      padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds);
    clock.nodeValue = timeString;
    return clock;
  }

  clock.tick = function () {
    var timer = document.createElement("span");

    var time = document.createTextNode("");
    timer.appendChild(time);

    timer.timeoutId = setInterval(function () {
      time = updateClock(time);
    }, 1000);
    updateClock(time);

    return timer;
  };

  clock.halt = function (timer) {
    clearInterval(timer.timeoutId);
  };

  marcOS.system.comps.clock = clock;
})();
