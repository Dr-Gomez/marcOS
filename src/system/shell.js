(function () {
  var bulkJS = marcOS.kernel.loader.bulkJS;
  var base = "system/shell/";

  marcOS.shell = {};
  bulkJS([base + "splash.js", base + "popup.js"]);
})();
