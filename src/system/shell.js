(function () {
  var bulkJS = marcOS.loader.bulkJS;

  marcOS.shell = {};
  bulkJS(["system/shell/monitor.js", "system/shell/popup.js"]);
})();
