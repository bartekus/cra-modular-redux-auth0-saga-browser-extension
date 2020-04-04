// @ts-ignore
const req = require.context('.', true, /\.\/.+\/actions\.ts$/);

req.keys().forEach((key) => {
  const actions = req(key);

  Object.keys(actions).forEach((name) => {
    module.exports[name] = actions[name];
  });
});
