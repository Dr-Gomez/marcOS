(function () {
  var loadTree = marcOS.kernel.loader.loadTree;

  loadTree({
    system: {
      clear: "js",
      monitor: "js",
      shell: {
        popup: ["js", "css"],
        splash: ["js", "css"],
      },
    },
  });
})();
