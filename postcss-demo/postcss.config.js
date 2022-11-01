const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  // postcss-preset-env 预设插件，一次性装必要的插件
  plugins: [postcssPresetEnv()]
}
