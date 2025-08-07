(function () {
  var API;

  function setAPI(possibleApi) {
    if (possibleApi) {
      API = possibleApi;
    } else {
      API = window;
    }
  }

  function isFeatureAbsent(featureStr) {
    var currentAPI = API;
    var parts = featureStr.split(".");

    var joinedParts = "";

    for (var depth = 0; depth < parts.length; depth++) {
      var nextPart = parts[depth];
      joinedParts += nextPart;
      var path = currentAPI[nextPart];
      if (typeof path == "undefined") {
        return true;
      } else {
        currentAPI = path;
      }
    }

    return false;
  }

  wios.feat = {
    checkFeatures: function (features, possibleApi) {
      var absentFeatures = [];

      setAPI(possibleApi);

      for (
        var featureIndex = 0;
        featureIndex < features.length;
        featureIndex++
      ) {
        var feature = features[featureIndex];

        var absent = isFeatureAbsent(feature);

        if (absent) {
          var latestAbsence = absentFeatures.length;
          absentFeatures[latestAbsence] = feature;
        }
      }

      return absentFeatures;
    },

    hasFeature: function (feature, possibleApi) {
      setAPI(possibleApi);
      return !isFeatureAbsent(feature);
    },

    hasFeatures: function (features, possibleApi) {
      for (
        var featureIndex = 0;
        featureIndex < features.length;
        featureIndex++
      ) {
        if (!wios.feat.hasFeature(features[featureIndex], possibleApi)) {
          return false;
        }
      }

      return true;
    },
  };
})();
