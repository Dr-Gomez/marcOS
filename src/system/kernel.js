(function () {
  var bulkJS = marcOS.loader.bulkJS;

  var base = "system/kernel/";

  marcOS.kernel = {};
  bulkJS([base + "loader.js"]);
})();
