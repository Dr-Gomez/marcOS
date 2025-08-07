(function () {
  var mater = {};

  mater.isUndefined = function (thing) {
    return typeof thing == "undefined";
  };

  mater.isFunction = function (thing) {
    return typeof thing == "function";
  };

  mater.isObject = function (thing) {
    return typeof thing == "object" && thing != null;
  };

  mater.isNull = function (thing) {
    return typeof thing == "object" && thing == null;
  };

  mater.isNumber = function (thing) {
    return typeof thing == "number";
  };

  mater.isBigint = function (thing) {
    return typeof thing == "bigint";
  };

  mater.isBoolean = function (thing) {
    return typeof thing == "boolean";
  };

  mater.isString = function (thing) {
    return typeof thing == "string";
  };

  mater.isSymbol = function (thing) {
    return typeof thing == "symbol";
  };

  marcOS.kernel.mater = mater;
})();
