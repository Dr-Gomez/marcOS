(function () {
  var loader = {};

  var hasFeature = wios.feat.hasFeatures;

  if (hasFeature(["document.createElement", "document.appendChild"])) {
    var canDefer, location;
    var testScript = document.createElement("script");
    if (typeof testScript.defer != "undefined") {
      canDefer = true;
      location = document.head;
    } else {
      canDefer = false;
      location = document.createElement("div");
      document.body.appendChild(location);
    }

    function loadPlainJS(src) {
      var script = document.createElement("script");
      script.src = src;
      script.type = "text/javascript";
      script.defer = canDefer;
      location.appendChild(script);

      return script;
    }

    function hasCallback(callback) {
      if (callback && typeof callback == "function") {
        return true;
      } else {
        return false;
      }
    }

    loader.loadJS = function (source, callback) {
      var script = loadPlainJS(source);
      if (hasCallback(callback)) {
        script.onload = callback;
      }
      return script;
    };

    function loadNextScript(sources, sourceIndex, callback) {
      if (sourceIndex >= sources.length) {
        if (typeof callback == "function") callback();
        return;
      }

      var source = sources[sourceIndex];

      var script = loadPlainJS(source);
      script.onload = function () {
        loadNextScript(sources, sourceIndex + 1, callback);
      };
    }

    loader.bulkJS = function (sources, callback) {
      loadNextScript(sources, 0, callback);
    };

    wios.loader = loader;
  }
})();
