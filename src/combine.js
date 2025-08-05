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

      comps: {
        clock: "js",
      },

      gate: ["js", "css"],
    },
  });
})();
