(function () {
  if (window.checkFeatures) {
    absentLogs = window.checkFeatures(["console.log", "status"]);

    function repeatChar(char, num) {
      var originalChar = char;
      for (var repeat = 0; repeat < num - 1; repeat++) {
        char += originalChar;
      }

      return char;
    }

    var line = repeatChar("-", 80);

    var canTrace = false;

    function wrapLog(text, color) {
      // Default color is black
      var ansiiColor = "\u001b[30m";

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

      window.console.log("SIGNAL [" + text + "] WAS SENT FROM:");
      if (canTrace) {
        window.console.trace();
      }

      window.console.log(ansiiColor + line);
    }

    window.terminal = {};

    function initConsole() {
      var terminal = {};

      canTrace = window.checkFeatures(["console.trace"]).length == 0;
      terminal.logMsg = function (msg) {
        wrapLog(msg, "aqua");
      };

      terminal.logWarn = function (warn) {
        wrapLog(warn, "yellow");
      };

      terminal.logErr = function (err) {
        wrapLog(err, "purple");
      };

      return terminal;
    }

    function initStatus() {
      var terminal = {};

      terminal.logMsg = function (msg) {
        window.status = msg;
      };

      terminal.logWarn = function (warn) {
        window.status = warn;
      };

      terminal.logErr = function (err) {
        window.status = err;
      };

      return terminal;
    }

    // Combine both
    function initInfo() {
      var terminal = {};

      var consoleTerm = initConsole();
      var statusTerm = initStatus();

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

      return terminal;
    }

    // Neither supported (Dev enviroment is on another handle and we don't know about it)
    function initUnknown() {
      var terminal = {};

      var ports = ["logMsg", "logWarn", "logErr"];

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
      } else if (absentLogs[0] == "console.log") {
        window.terminal = initStatus();
      }
    } else {
      windows.terminal = initUnknown();
    }
  }
})();
