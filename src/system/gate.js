(function () {
  var gate = {};

  var monitor = marcOS.system.monitor;

  var splash = marcOS.system.shell.splash;

  var clock = marcOS.system.comps.clock;

  var calendar = marcOS.system.comps.calendar;

  function suitupStart(gateBars) {
    document.removeEventListener("keydown", suitupStart);
    document.removeEventListener("mousedown", suitupStart);
    gateBars.className += " glitch-out";

    setTimeout(function () {}, 2000);
  }

  function showBlockade() {
    splash.show();

    var gateBars = document.createElement("div");
    gateBars.className = "gateBars";
    monitor.appendChild(gateBars);

    var gateClock = clock.tick();
    gateClock.className = "gateClock";
    gateBars.appendChild(gateClock);

    var gateCalendar = calendar.mark();
    gateCalendar.className = "gateCalendar";
    gateBars.appendChild(gateCalendar);

    document.addEventListener("keydown", function () {
      suitupStart(gateBars);
    });
    document.addEventListener("mousedown", function () {
      suitupStart(gateBars);
    });
  }

  function hideBlockade() {
    splash.shoo();
  }

  gate.lock = function () {
    showBlockade();
  };

  gate.unlock = function () {
    hideBlockade();
  };

  gate.close = function () {
    showBlockade();
  };

  gate.open = function () {
    hideBlockade();
  };

  marcOS.system.gate = gate;
  gate.lock();
})();
