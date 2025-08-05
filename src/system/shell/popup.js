(function () {
  var DISTANCE = 4;
  var BUTTON_WIDTH = 18;
  var SNAP_ZONE = 64;

  var monitor = marcOS.monitor;
  var loadCSS = marcOS.kernel.loader.loadCSS;

  var popup = {};

  popup.create = function (props) {
    if (!props) {
      props = {};
    }

    var frame = document.createElement("div");
    frame.className = "popupFrame";

    if (!props.tab) {
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

      function getWidth() {
        return innerWidth || screen.availWidth || screen.width;
      }

      function getHeight() {
        return innerHeight || screen.availHeight || screen.height;
      }

      var styler = frame.style;

      function setStrPos(top, right, bottom, left) {
        styler.top = top;
        styler.right = right;
        styler.bottom = bottom;
        styler.left = left;
      }

      function pixelate(number) {
        return number.toString() + "px";
      }

      function setSize(widthNorm, heightNorm) {
        styler.width = pixelate(widthNorm * getWidth());
        styler.height = pixelate(heightNorm * getHeight());
      }

      document.addEventListener("mousemove", function (e) {
        if (isDragging) {
          e = e || window.event;

          var left = e.clientX;
          var top = e.clientY;

          setStrPos(pixelate(top - offsetY), "", "", pixelate(left - offsetX));

          if (left < SNAP_ZONE) {
            leftSnap = true;
            rightSnap = false;
          } else if (left > getWidth() - SNAP_ZONE) {
            leftSnap = false;
            rightSnap = true;
          } else {
            leftSnap = false;
            rightSnap = false;
          }

          if (top < SNAP_ZONE) {
            topSnap = true;
            bottomSnap = false;
          } else if (
            top >
            (window.innerHeight || screen.availHeight || screen.height) -
              SNAP_ZONE
          ) {
            topSnap = false;
            bottomSnap = true;
          } else {
            topSnap = false;
            bottomSnap = false;
          }
        }
      });

      document.addEventListener("mouseup", function () {
        if (isDragging) {
          if (topSnap && leftSnap) {
            setStrPos("0", "", "", "0");
            setSize(0.5, 0.5);
          } else if (topSnap && rightSnap) {
            setStrPos("0", "0", "", "");
            setSize(0.5, 0.5);
          } else if (bottomSnap && rightSnap) {
            setStrPos("", "0", "0", "");
            setSize(0.5, 0.5);
          } else if (bottomSnap && leftSnap) {
            setStrPos("", "", "0", "0");
            setSize(0.5, 0.5);
          } else if (topSnap) {
            setStrPos("0", "", "", "0");
            setSize(1, 0.5);
          } else if (rightSnap) {
            setStrPos("0", "0", "", "");
            setSize(0.5, 1);
          } else if (bottomSnap) {
            setStrPos("", "", "0", "0");
            setSize(1, 0.5);
          } else if (leftSnap) {
            setStrPos("0", "", "", "0");
            setSize(0.5, 1);
          }
          isDragging = false;
        }
      });

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
        frame.style.display = "none";
      });

      makeButton("lime", function () {
        setStrPos("0", "", "", "0");
        setSize(1, 1);
      });
    }

    monitor.appendChild(frame);

    return frame;
  };

  marcOS.shell.popup = popup;
})();
