(function () {
  var monitor = marcOS.system.monitor;

  var splash = {};

  splash.show = function (props) {
    var splashScreen = document.getElementById("splash");
    if (splashScreen) {
      monitor.removeChild(splashScreen);
    }
    if (!props) {
      props = {};
    }

    if (typeof props.type == "undefined") {
      props.type = "image";
    }

    if (props.type == "image") {
      splashScreen = document.createElement("img");
      if (typeof props.src == "undefined") {
        splashScreen.src = "system/default/rosie-pixelated.jpeg";
      } else {
        splashScreen.src = props.src;
      }
    } else {
      splashScreen = document.createElement("div");
      if (typeof props.color == undefined) {
        splashScreen.style.backgroundColor = "navy";
      } else {
        splashScreen.style.backgroundColor = props.color;
      }
    }

    splashScreen.className = "splash";
    splashScreen.id = "splash";
    monitor.appendChild(splashScreen);

    return splashScreen;
  };

  splash.shoo = function () {
    var splashScreen = document.getElementById("splash");
    if (splashScreen) {
      monitor.removeChild(splashScreen);
    }
  };

  marcOS.system.shell.splash = splash;
})();
