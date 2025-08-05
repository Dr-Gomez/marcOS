(function () {
  var bulkJS = wios.loader.bulkJS;

  marcOS.kernel = {};

  var base = "kernel/";

  bulkJS([base + "mater.js", base + "loader.js", "combine.js"]);
})();
