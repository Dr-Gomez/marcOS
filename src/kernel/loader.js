(function () {
  var mater = marcOS.kernel.mater;
  var exists = mater.exists;
  var groups = mater.groups;
  var describes = mater.describes;
  var counts = mater.counts;

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
    if (!exists(path)) {
      path = "";
    }

    if (!exists(domain)) {
      domain = marcOS;
    }

    for (var object in tree) {
      var extension = tree[object];

      if (groups(extension) && counts(extension.length)) {
        var extIndex = 0;

        for (extIndex; extIndex < extension.length; extIndex++) {
          var extensionStr = extension[extIndex];
          loaderMap[extensionStr](path + "/" + object + "." + extensionStr);
        }
      } else if (describes(extension)) {
        loaderMap[extension](path + "/" + object + "." + extension);
      } else if (groups(extension)) {
        domain[object] = {};
        domain = domain[object];
        path += "/" + object;
        loader.loadTree(extension, path, domain);
      }
    }
  };

  marcOS.kernel.loader = loader;
})();
