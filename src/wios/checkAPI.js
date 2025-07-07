// JS API checker

// IIFE to not pollute global namespaces
(function () {
  // Global API to check what browser API's are avaiable. Used to make sure an app in the OS is capable of running
  function isFeatureAbsent(featureStr) {
    var parts = featureStr.split(".");
    var current = window;

    var joinedParts = "";

    for (var depth = 0; depth < parts.length; depth++) {
      var nextPart = parts[depth];
      joinedParts += nextPart;
      var path = current[nextPart];
      if (typeof path == "undefined") {
        return joinedParts;
      } else {
        current = path;
      }
    }

    return null;
  }

  // This function returns an array with the name of every absent API
  // If the intent is to check that an app can run, check if the length of the array is 0
  window.checkFeatures = function (features) {
    var absentFeatures = [];

    for (var featureIndex = 0; featureIndex < features.length; featureIndex++) {
      var feature = features[featureIndex];
      var absent = isFeatureAbsent(feature);

      if (absent) {
        var latestAbsence = absentFeatures.length;
        absentFeatures[latestAbsence] = feature;
      }
    }

    return absentFeatures;
  };
})();
