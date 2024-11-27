const path = require('path');
const { fileURLToPath } = require('url');

// Convert the .mjs file into a CommonJS-compatible export
const configPath = path.resolve(__dirname, './truffle-config.mjs');
const esmModule = require('esm')(module);
const config = esmModule(configPath).default;

module.exports = config;
