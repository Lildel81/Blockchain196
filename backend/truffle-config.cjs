// truffle-config.cjs
(async () => {
    const config = await import('./truffle-config.mjs');
    module.exports = config.default;
  })();