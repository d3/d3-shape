'use strict';

const output = process.env.BABEL_OUTPUT;
const modules = output == null ? false : output;

module.exports = {
  presets: [['@babel/env', { loose: true, modules }]],
};
