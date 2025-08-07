(function () {
  marcOS.kernel.mater = {
    isUndefined: function (thing) {
      return typeof thing == "undefined";
    },

    isFunction: function (thing) {
      return typeof thing == "function";
    },

    isObject: function (thing) {
      return typeof thing == "object" && thing != null;
    },

    isNull: function (thing) {
      return typeof thing == "object" && thing == null;
    },

    isNumber: function (thing) {
      return typeof thing == "number";
    },

    isBigint: function (thing) {
      return typeof thing == "bigint";
    },

    isBoolean: function (thing) {
      return typeof thing == "boolean";
    },

    isString: function (thing) {
      return typeof thing == "string";
    },

    isSymbol: function (thing) {
      return typeof thing == "symbol";
    },
  };
})();
