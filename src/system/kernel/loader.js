(function () {
  var loader = {};

  loader.loadCSS = function (src) {
    var stylesheet = document.createElement("link");
    stylesheet.href = src;
    stylesheet.rel = "stylesheet";
    document.head.appendChild(stylesheet);
  };

  marcOS.kernel.loader = loader;
})();
