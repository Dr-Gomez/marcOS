(function () {
  var hasFeature = marcOS.feat.hasFeature;

  marcOS.initLoader = function () {
    var canCreate = hasFeature("document.createElement");
    var canAppend = hasFeature("document.appendChild");

    if (canCreate && canAppend) {
      marcOS.loader = {};

      var testScript = document.createElement("script");

      var hasOnload = hasFeature("onload", testScript);
      var hasDefer;

      var location;
      var callHandler;
      if (hasOnload) {
        hasDefer = hasFeature("defer", testScript);

        if (hasDefer) {
          location = document.head;
        } else {
          location = document.body;
        }

        callHandler = function (script, call) {
          script.onload = call;
        };
      } else if (hasFeature("getElementById", document)) {
        hasDefer = false;

        location = document.body;

        var callstack = [];
        marcOS.callstack = callstack;

        var container = document.getElementById("callbacks");
        if (!container) {
          container = document.createElement("div");
          container.id = "callbacks";
          document.body.appendChild(container);
        }

        callHandler = function (_script, call) {
          callstack[callstack.length] = call;

          var oddScript = document.getElementById("oddCallback");
          var evenScript = document.getElementById("evenCallback");

          if (!(oddScript || evenScript)) {
            var callbackScript = document.createElement("script");
            callbackScript.src = "wios/callbacks/oddCallback.js";
            callbackScript.id = "oddCallback";
            container.appendChild(callbackScript);
          }
        };
      }

      marcOS.loader.loadJS = function (src, callback) {
        if (!callback) {
          callback = function () {};
        }

        var script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.defer = hasDefer;
        callHandler(script, callback);
        location.appendChild(script);
      };

      marcOS.loader.bulkJS = function (scripts, callback) {
        if (!callback) {
          callback = function () {};
        }

        function loadNextScript(index) {
          if (index >= scripts.length) {
            callback();
            return;
          }

          var scriptSrc = scripts[index];

          marcOS.loader.loadJS(scriptSrc, function () {
            loadNextScript(index + 1);
          });
        }

        loadNextScript(0);
      };
    }
  };

  marcOS.initLoader();
})();
