(function () {
  var thisScript = document.getElementById("evenCallback");
  var container = document.getElementById("callbacks");

  container.removeChild(thisScript);

  var stack = marcOS.callstack;
  var size = stack.length;

  if (typeof size === "number" && size > 0) {
    var index = size - 1;
    var func = stack[index];
    stack.length = index;
    func();

    if (stack.length > 0) {
      var otherScript = document.createElement("script");
      otherScript.src = "wios/callbacks/oddCallback.js";
      otherScript.id = "oddCallback";
      container.appendChild(otherScript);
    }
  }
})();
