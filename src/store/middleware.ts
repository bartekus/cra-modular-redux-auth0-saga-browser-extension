// @ts-ignore
const req = require.context('.', true, /\.\/.+\/middleware\.ts$/);

module.exports = req.keys().map((key: any) => req(key).default);
