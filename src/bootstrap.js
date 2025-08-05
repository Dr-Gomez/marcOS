(function () {
  var bulkJS = wios.loader.bulkJS;

  var base = "system/";

  bulkJS([
    base + "kernel.js",
    base + "clear.js",
    base + "monitor.js",
    base + "shell.js",
  ]);
})();
