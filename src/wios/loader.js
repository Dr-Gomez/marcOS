(function () {
  var loader = {};

  var hasFeatures = wios.feat.hasFeatures;

  if (
    hasFeatures([
      "document.createElement",
      "document.appendChild",
      "document.getElementById",
    ])
  ) {
    var location = document.getElementById("syscripts");

    loader.bulkJS = function (scriptSources) {
      for (var i = 0; i < scriptSources.length; i++) {
        var script = document.createElement("script");
        script.src = scriptSources[i];
        script.defer = true;
        script.async = false;
        script.type = "text/javascript";
        location.appendChild(script);
      }
    };

    wios.loader = loader;
  } else {
    terminal.logErr("BIOS ERR: Unable to locate bootstrap");
  }
})();
