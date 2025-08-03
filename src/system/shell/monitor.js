(function () {
  var monitor = document.createElement("div");
  monitor.style.position = "fixed";
  monitor.style.width = "100%";
  monitor.style.height = "100%";
  monitor.style.margin = "0";
  monitor.style.padding = "0";
  monitor.style.backgroundColor = "black";
  document.body.appendChild(monitor);

  marcOS.monitor = monitor;
})();
