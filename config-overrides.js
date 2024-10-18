const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@assets": path.resolve(__dirname, "src/assets"),
    "@types": path.resolve(__dirname, "src/types"),
    "@components": path.resolve(__dirname, "src/components"),
    "@constants": path.resolve(__dirname, "src/constants"),
    "@api": path.resolve(__dirname, "src/api"),
  };

  return config;
};
