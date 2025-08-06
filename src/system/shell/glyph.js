(function () {
  glyph = {};

  var exists = marcOS.kernel.mater.exists;

  var style = document.createElement("style");
  document.head.appendChild(style);
  document.body.style.fontFamily = "marcOS";

  glyph.write = function (src) {
    var index = src.length - 1;
    for (index; index > 0; index--) {
      if (src.charAt(index) == ".") {
        break;
      }
    }

    var type = src.substring(++index);

    style.textContent =
      "@font-face {" +
      'font-family: "marcOS";' +
      'src: url("' +
      src +
      '") format("' +
      type +
      '");' +
      "font-weight: normal;" +
      "font-style: normal;" +
      "}";
  };

  glyph.remove = function () {
    style.textContent = "";
  };

  glyph.write("system/fonts/w95font.woff");
})();
