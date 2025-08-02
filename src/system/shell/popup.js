(function () {
  var DISTANCE = 4;
  var BUTTON_WIDTH = 18;

  var popup = {};

  var style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "system/shell/popup.css";
  document.head.appendChild(style);

  popup.create = function (props) {
    if (!props) {
      props = {};
    }

    var frame = document.createElement("div");
    frame.className = "popupFrame";

    var tab = document.createElement("div");
    tab.className = "popupTab";
    frame.appendChild(tab);

    var offsetX,
      offsetY,
      isDragging = false;

    tab.onmousedown = function (e) {
      e = e || window.event;

      var target = e.target || event.srcElement;
      if (target != tab) return;

      isDragging = true;
      e.preventDefault();

      offsetX = e.clientX - frame.offsetLeft;
      offsetY = e.clientY - frame.offsetTop;
    };

    var leftSnap, topSnap, rightSnap, bottomSnap;

    document.onmousemove = function (e) {
      if (isDragging) {
        e = e || window.event;

        var left = e.clientX;
        var top = e.clientY;

        frame.style.left = (left - offsetX).toString() + "px";
        frame.style.top = (top - offsetY).toString() + "px";

        if (left < 10) {
          leftSnap = true;
          rightSnap = false;
        } else if (left > screen.width - 10) {
          leftSnap = false;
          rightSnap = true;
        } else {
          leftSnap = false;
          rightSnap = false;
        }

        if (top < 10) {
          topSnap = true;
          bottomSnap = false;
        } else if (top > screen.height - 10) {
          topSnap = false;
          bottomSnap = true;
        } else {
          topSnap = false;
          bottomSnap = false;
        }
      }
    };

    document.onmouseup = function () {
      isDragging = false;
    };

    var title = document.createElement("span");
    title.className = "popupTitle";
    title.style.left = DISTANCE.toString() + "px";
    tab.appendChild(title);

    if (!props.title) {
      props.title = "Untitled";
    }

    var titleContent = document.createTextNode(props.title);
    title.appendChild(titleContent);

    var right = DISTANCE;
    function makeButton(color, func) {
      var button = document.createElement("button");
      button.onclick = func;
      button.style.backgroundColor = color;
      button.style.right = right.toString() + "px";
      button.className = "popupButton";
      tab.appendChild(button);
      right += DISTANCE + BUTTON_WIDTH;
    }

    makeButton("red", function () {
      monitor.removeChild(frame);
    });

    makeButton("yellow", function () {
      monitor.style.display = "none";
    });

    makeButton("lime", function () {
      frame.style.top = "0";
      frame.style.left = "0";
      frame.style.width = "100%";
      frame.style.height = "100%";
    });

    return frame;
  };

  marcOS.shell.popup = popup;
})();
