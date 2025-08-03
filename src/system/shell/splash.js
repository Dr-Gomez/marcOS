(function () {
  var hasFeature = marcOS.feat.hasFeature;
  var monitor = marcOS.monitor;
  var loadCSS = marcOS.kernel.loader.loadCSS;

  var splash = {};

  loadCSS("system/shell/splash.css");

  splash.show = function (props) {
    var splashScreen = document.getElementById("splash");
    if (splashScreen) {
      marcOS.monitor.removeChild(splashScreen);
    }
    if (!props) {
      props = {};
    }

    if (!hasFeature("type", props)) {
      props.type = "image";
    }

    if (props.type == "image") {
      splashScreen = document.createElement("img");
      if (hasFeature("src", props)) {
        splashScreen.src = props.src;
      } else {
        splashScreen.src = "system/default/rosie-pixelated.jpeg";
      }
    } else if (props.type == "flat") {
      splashScreen = document.createElement("div");
      if (hasFeature("color", props)) {
        splashScreen.style.backgroundColor = props.color;
      } else {
        splashScreen.style.backgroundColor = "navy";
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
      marcOS.monitor.removeChild(splashScreen);
    }
  };

  marcOS.shell.splash = splash;
})();
