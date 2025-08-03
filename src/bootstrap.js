(function () {
  var bulkJS = marcOS.loader.bulkJS;

  var base = "system/";

  bulkJS([
    base + "clear.js",
    base + "monitor.js",
    base + "kernel.js",
    base + "shell.js",
  ]);
})();
