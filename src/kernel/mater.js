(function () {
  var mater = {};

  mater.exists = function (thing) {
    return typeof thing != "undefined";
  };

  mater.acts = function (thing) {
    return typeof thing == "function";
  };

  mater.groups = function (thing) {
    return typeof thing == "object" && thing != null;
  };

  mater.nullifies = function (thing) {
    return typeof thing == "object" && thing == null;
  };

  mater.counts = function (thing) {
    return typeof thing == "number";
  };

  mater.delimits = function (thing) {
    return typeof thing == "bigint";
  };

  mater.states = function (thing) {
    return typeof thing == "boolean";
  };

  mater.describes = function (thing) {
    return typeof thing == "string";
  };

  mater.identifies = function (thing) {
    return typeof thing == "symbol";
  };

  marcOS.kernel.mater = mater;
})();
