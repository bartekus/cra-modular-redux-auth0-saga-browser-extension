#!/usr/bin/env node

// A script for developing a browser extension with live-reloading
// using Create React App (no need to eject).
// Run it instead of the "start" script of your app for a nice
// development environment.
// P.S.: Install webpack-extension-reloader and html-webpack-plugin before running it.

// Force a "development" environment in watch mode
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const fs = require("fs-extra");
const path = require("path");
const paths = require("react-scripts/config/paths");
const webpack = require("webpack");
const configFactory = require("react-scripts/config/webpack.config");
const colors = require("colors/safe");
const ExtensionReloader = require("webpack-extension-reloader");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const popupName = 'popup';
const optionsName = 'options';
const backgroundName = 'background';

// Create the Webpack config usings the same settings used by the "start" script
// of create-react-app.
const config = configFactory("development");

// Since we need more entries than one we need to redefine entry as an object instead of array
config.entry = {
  [backgroundName]: path.join(__dirname, "..", "src", "background.ts"),
  [optionsName]: path.join(__dirname, "..", "src", "options.ts"),
  [popupName]: path.join(__dirname, "..", "src", "index.tsx"),
};

config.output.filename = 'static/js/[name].bundle.js';

// Edit the Webpack config by setting the output directory to "./build".
config.output.path = paths.appBuild;
paths.publicUrl = paths.appBuild + "/";

config.plugins = config.plugins.filter(function(plugin) {
  if (plugin.opts && plugin.opts.fileName === 'asset-manifest.json') {
    plugin.opts.generate = (seed, files, entrypoints) => {
      const manifestFiles = files.reduce((manifest, file) => {
        manifest[file.name] = file.path;
        return manifest;
      }, seed);

      const entrypointFiles = {};

      for (const property in entrypoints) {
        entrypointFiles[property] = entrypoints[property].filter(
          fileName => !fileName.endsWith('.map')
        );
      }

      return {
        files: manifestFiles,
        entrypoints: entrypointFiles,
      };
    }
  }

  return plugin;
});

const appBackgroundHtml = path.join(__dirname, "..", "public", "background.html");
const appOptionsHtml = path.join(__dirname, "..", "public", "options.html");

config.plugins.unshift(
  new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        inject: true,
        template: appOptionsHtml,
      },
      // isEnvProduction
      //   ? {
      //     minify: {
      //       removeComments: true,
      //       collapseWhitespace: true,
      //       removeRedundantAttributes: true,
      //       useShortDoctype: true,
      //       removeEmptyAttributes: true,
      //       removeStyleLinkTypeAttributes: true,
      //       keepClosingSlash: true,
      //       minifyJS: true,
      //       minifyCSS: true,
      //       minifyURLs: true,
      //     },
      //   }
      //   : undefined
    )
  ),
);

config.plugins.unshift(
  new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        inject: true,
        template: appBackgroundHtml,
      },
      // isEnvProduction
      //   ? {
      //     minify: {
      //       removeComments: true,
      //       collapseWhitespace: true,
      //       removeRedundantAttributes: true,
      //       useShortDoctype: true,
      //       removeEmptyAttributes: true,
      //       removeStyleLinkTypeAttributes: true,
      //       keepClosingSlash: true,
      //       minifyJS: true,
      //       minifyCSS: true,
      //       minifyURLs: true,
      //     },
      //   }
      //   : undefined
    )
  ),
);

config.plugins[0].options.filename = backgroundName + ".html";
config.plugins[0].options.excludeChunks = [popupName, optionsName];

config.plugins[1].options.filename = optionsName + ".html";
config.plugins[1].options.excludeChunks = [backgroundName, popupName];

config.plugins[2].options.excludeChunks = [backgroundName, optionsName];

// console.log(config.plugins[0]);
// console.log(config.plugins[1]);
// console.log(config.plugins[2]);

// Add the webpack-extension-reloader plugin to the Webpack config.
// It notifies and reloads the extension on code changes.
config.plugins.push(new ExtensionReloader());

// Start Webpack in watch mode.
const compiler = webpack(config);
const watcher = compiler.watch({}, function(err) {
  if (err) {
    console.error(err);
  } else {
    // Every time Webpack finishes recompiling copy all the assets of the
    // "public" dir in the "build" dir (except for the background.html, index.html and options.html)
    fs.copySync(paths.appPublic, paths.appBuild, {
      dereference: true,
      filter: file => file !== paths.appHtml && file !== appBackgroundHtml && file !== appOptionsHtml
    });
    // Report on console the successful build
    console.clear();
    console.info(colors.green("Compiled successfully!"));
    console.info("Built at", new Date().toLocaleTimeString());
    console.info();
    console.info("Note that the development build is not optimized.");
    console.info("To create a production build, use yarn build.");
  }
});
