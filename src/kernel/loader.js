(function () {
  var mater = marcOS.kernel.mater;
  var isUndefined = mater.isUndefined;
  var isObject = mater.isObject;
  var isString = mater.isString;
  var isNumber = mater.isNumber;

  var loader = {};

  loader.loadCSS = function (src) {
    var stylesheet = document.createElement("link");
    stylesheet.href = src;
    stylesheet.rel = "stylesheet";
    document.head.appendChild(stylesheet);
  };

  var canDefer, location;
  var testScript = document.createElement("script");
  if (typeof testScript.defer != "undefined") {
    canDefer = true;
    location = document.head;
  } else {
    canDefer = false;
    location = document.createElement("div").id = "scripts";
    document.body.appendChild(location);
  }

  loader.loadJS = function (src) {
    var script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.defer = canDefer;
    location.appendChild(script);
  };

  var loaderMap = {
    js: loader.loadJS,
    css: loader.loadCSS,
  };

  loader.loadTree = function (tree, path, domain) {
    if (isUndefined(path)) {
      path = "";
    }

    if (isUndefined(domain)) {
      domain = marcOS;
    }

    for (var object in tree) {
      var extension = tree[object];

      if (isObject(extension) && isNumber(extension.length)) {
        var extIndex = 0;

        for (extIndex; extIndex < extension.length; extIndex++) {
          var extensionStr = extension[extIndex];
          loaderMap[extensionStr](path + "/" + object + "." + extensionStr);
        }
      } else if (isString(extension)) {
        loaderMap[extension](path + "/" + object + "." + extension);
      } else if (isObject(extension)) {
        domain[object] = {};
        loader.loadTree(extension, path + "/" + object, domain[object]);
      }
    }
  };

  marcOS.kernel.loader = loader;
})();
