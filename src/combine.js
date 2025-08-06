(function () {
  var loadTree = marcOS.kernel.loader.loadTree;

  loadTree({
    system: {
      clear: "js",
      monitor: "js",

      comps: {
        clock: "js",
        calendar: "js",
      },

      shell: {
        popup: ["js", "css"],
        splash: ["js", "css"],
        glyph: "js",
      },

      gate: ["js", "css"],
    },
  });
})();
