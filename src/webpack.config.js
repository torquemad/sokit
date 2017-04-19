'use strict'
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './app/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
              vue: 'vue/dist/vue.js'
            }
    }
};

