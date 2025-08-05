(function () {
  var ansiColors = {
    black: "\u001b[30m",
    red: "\u001b[31m",
    green: "\u001b[32m",
    yellow: "\u001b[33m",
    blue: "\u001b[34m",
    purple: "\u001b[35m",
    aqua: "\u001b[36m",
    white: "\u001b[37m",
    gray: "\u001b[90m",
    brightRed: "\u001b[91m",
    brightGreen: "\u001b[92m",
    brightYellow: "\u001b[93m",
    brightBlue: "\u001b[94m",
    brightPurple: "\u001b[95m",
    brightAqua: "\u001b[96m",
    brightWhite: "\u001b[97m",
  };

  var hexColors = {
    black: "#000000",
    red: "#800000",
    green: "#008000",
    yellow: "#808000",
    blue: "#000080",
    purple: "#800080",
    aqua: "#008080",
    white: "#c0c0c0",
    gray: "#808080",
    brightRed: "#ff8888",
    brightGreen: "#88ff88",
    brightYellow: "#ffff88",
    brightBlue: "#8888ff",
    brightPurple: "#ff88ff",
    brightAqua: "#88ffff",
    brightWhite: "#ffffff",
  };

  function initConsole() {
    function repeatChar(char, num) {
      var originalChar = char;
      for (var repeat = 0; repeat < num - 1; repeat++) {
        char += originalChar;
      }

      return char;
    }

    var line = repeatChar("-", 80);
    var clearSpace = repeatChar("\n", 64);

    function consoleHas(feature) {
      return wios.feat.hasFeature(feature, console);
    }

    function wrapLog(text, type, color) {
      var ansiColor = "";
      var hexColor = "";

      if (color) {
        ansiColor = ansiColors[color];
        hexColor = hexColors[color];
      }

      console.log(
        "%c" + ansiColor + "%c" + line,
        "color: transparent; font-size: 0",
        "color: " + hexColor
      );
      console.log("SIGNAL [[" + type + "]]: [" + text + "] WAS SENT");
      console.log(
        "%c" + ansiColor + "%c" + line,
        "color: transparent; font-size: 0",
        "color: " + hexColor
      );
    }
    if (consoleHas("log")) {
      var terminal = {};

      var wrapTrace;

      if (consoleHas("trace")) {
        wrapTrace = function () {
          console.log("FROM: ");
          console.trace();
          console.log(line);
        };
      } else {
        wrapTrace = function () {};
      }

      terminal.logAnon = function (msg) {
        wrapLog(msg, "ANON", "brightAqua");
      };

      terminal.logMsg = function (msg) {
        wrapLog(msg, "MSG", "brightGreen");
        wrapTrace();
      };

      terminal.logWarn = function (warn) {
        wrapLog(warn, "WARN", "brightYellow");
        wrapTrace();
      };

      terminal.logErr = function (err) {
        wrapLog(err, "ERR", "brightRed");
        wrapTrace();
      };

      if (consoleHas("clear")) {
        terminal.logClear = function () {
          console.clear();
          wrapLog("COMPLETE", "CLEAR", "brightPurple");
          wrapTrace();
        };

        terminal.logWipe = function () {
          console.clear();
          wrapLog("COMPLETE", "WIPE", "purple");
        };
      } else {
        terminal.logClear = function () {
          console.log(clearSpace);
          wrapLog("COMPLETE", "CLEAR", "brightPurple");
          wrapTrace();
        };

        terminal.logWipe = function () {
          console.log(clearSpace);
          wrapLog("COMPLETE", "WIPE", "purple");
        };
      }

      return terminal;
    } else {
      var terminal = {};

      var ports = [
        "logAnon",
        "logMsg",
        "logWarn",
        "logErr",
        "logClear",
        "logWipe",
      ];

      for (var portIndex = 0; portIndex < ports.length; portIndex++) {
        terminal[ports[portIndex]] = function () {};
      }

      return terminal;
    }
  }

  function initStatus() {
    var terminal = {};

    terminal.logAnon = function (msg) {
      status = ansiColors["brightAqua"] + " - " + msg;
    };

    terminal.logMsg = function (msg) {
      status = ansiColors["brightGreen"] + " - " + msg;
    };

    terminal.logWarn = function (warn) {
      status = ansiColors["brightYellow"] + " - " + warn;
    };

    terminal.logErr = function (err) {
      status = ansiColors["brightRed"] + " - " + err;
    };

    terminal.logClear = function () {
      status = "";
    };

    terminal.logWipe = function () {
      status = "";
    };

    return terminal;
  }

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

    terminal.logWipe = function () {
      consoleTerm.logWipe();
      statusTerm.logWipe();
    };

    return terminal;
  }

  function initUnknown() {
    var terminal = {};

    var ports = [
      "logAnon",
      "logMsg",
      "logWarn",
      "logErr",
      "logClear",
      "logWipe",
    ];

    for (var portIndex = 0; portIndex < ports.length; portIndex++) {
      terminal[ports[portIndex]] = function () {
        window[
          "There is no way this exists on the window object"
        ].ERR404_Dev_Environment_Not_Found();
      };
    }

    return terminal;
  }

  wios.initTerminal = function () {
    var absentLogs = wios.feat.checkFeatures(["console", "status"]);

    if (absentLogs.length == 0) {
      wios.terminal = initInfo();
    } else if (absentLogs.length == 1) {
      if (absentLogs[0] == "status") {
        wios.terminal = initConsole();
      } else if (absentLogs[0] == "console") {
        wios.terminal = initStatus();
      }
    } else {
      wios.terminal = initUnknown();
    }
  };

  wios.initTerminal();
})();
