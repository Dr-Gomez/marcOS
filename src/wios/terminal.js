(function () {
  absentLogs = window.checkFeatures(["console", "status"]);

  function repeatChar(char, num) {
    var originalChar = char;
    for (var repeat = 0; repeat < num - 1; repeat++) {
      char += originalChar;
    }

    return char;
  }

  var line = repeatChar("-", 80);
  var clearSpace = repeatChar("\n", 64);

  function canLog() {
    return window.checkFeatures(["console.log"]).length == 0;
  }

  function canClear() {
    return window.checkFeatures(["console.clear"]).length == 0;
  }

  function canTrace() {
    return window.checkFeatures(["console.trace"]).length == 0;
  }

  function wrapLog(text, type, color) {
    if (canLog()) {
      // Uses ANSI escape codes for coloring on terminal
      // Default color is white
      var ansiiColor = "";

      if (color) {
        if (color == "aqua") {
          ansiiColor = "\u001b[36m";
        } else if (color == "yellow") {
          ansiiColor = "\u001b[33m";
        } else if (color == "purple") {
          ansiiColor = "\u001b[35m";
        } else {
          wrapLog("COLOR WAS NOT RECOGNIZED");
        }
      }

      window.console.log(ansiiColor + line);
      window.console.log("SIGNAL [[" + type + "]]: [" + text + "] WAS SENT");
      window.console.log(ansiiColor + line);
    }
  }

  function wrapTrace() {
    if (canTrace() && canLog()) {
      window.console.log("FROM: ");
      window.console.trace();
      window.console.log(line);
    }
  }

  window.terminal = {};

  function initConsole() {
    var terminal = {};

    terminal.logAnon = function (msg, type, color) {
      if (!type) {
        type = "ANON";
      }

      wrapLog(msg, type, color);
    };

    terminal.logMsg = function (msg) {
      terminal.logAnon(msg, "MSG", "aqua");
      wrapTrace();
    };

    terminal.logWarn = function (warn) {
      wrapLog(warn, "WARN", "yellow");
      wrapTrace();
    };

    terminal.logErr = function (err) {
      wrapLog(err, "ERR", "purple");
      wrapTrace();
    };

    terminal.logClear = function () {
      if (canClear()) {
        console.clear();
      } else {
        console.log(clearSpace);
        terminal.logAnon("LOG CLEARED");
      }
    };

    return terminal;
  }

  function initStatus() {
    var terminal = {};

    terminal.logAnon = function (msg) {
      window.status = msg;
    };

    terminal.logMsg = function (msg) {
      window.status = "\u001b[36m" + msg;
    };

    terminal.logWarn = function (warn) {
      window.status = "\u001b[33m" + warn;
    };

    terminal.logErr = function (err) {
      window.status = "\u001b[35m" + err;
    };

    terminal.logClear = function () {
      window.status = "";
    };

    return terminal;
  }

  // Combine both
  function initInfo() {
    var terminal = {};

    var consoleTerm = initConsole();
    var statusTerm = initStatus();

    terminal.logAnon = function (msg) {
      consoleTerm.logAnon(msg);
      statusTerm.logAnon(msg);
    };

    terminal.logMsg = function (msg) {
      consoleTerm.logMsg(msg);
      statusTerm.logMsg(msg);
    };

    terminal.logWarn = function (warn) {
      consoleTerm.logWarn(warn);
      statusTerm.logWarn(warn);
    };

    terminal.logErr = function (err) {
      consoleTerm.logErr(err);
      statusTerm.logErr(err);
    };

    terminal.logClear = function () {
      consoleTerm.logClear();
      statusTerm.logClear();
    };

    return terminal;
  }

  // Neither supported (Dev enviroment is on another handle and we don't know about it)
  function initUnknown() {
    var terminal = {};

    var ports = ["logAnon", "logMsg", "logWarn", "logErr", "logClear"];

    for (var portIndex = 0; portIndex < ports.length; portIndex++) {
      terminal[ports[portIndex]] = function () {
        // Browser will detect terminal and warn in dev enviroment, even if we don't know its handle
        // This code is meant to fail
        window[
          "There is no way this exists on the window object"
        ].ERR404_Dev_Enviroment_Not_Found();
      };
    }

    return terminal;
  }

  if (absentLogs.length == 0) {
    window.terminal = initInfo();
  } else if (absentLogs.length == 1) {
    if (absentLogs[0] == "status") {
      window.terminal = initConsole();
    } else if (absentLogs[0] == "console") {
      window.terminal = initStatus();
    }
  } else {
    windows.terminal = initUnknown();
  }
})();
