process.env.NODE_ENV = 'production'

const chalk = require('chalk');
const del = require('del');
const path = require('path');
const webpack = require('webpack');
const renderConfig = require('./renderer.prod.config');
const mainConfig = require('./main.prod.config');

function clean() {
  return new Promise((resolve, reject) => {
    console.log(chalk.default.yellow("Clearning compiled folder..."));
    del(['compiled/*']).then(() => {
      console.log(chalk.default.green("Done!"));
      resolve();
    }).catch((err) => {
      reject(err);
    });
  });
  
}

function start() {
  clean().then(() => {
    packAll();
  }).catch((err) => {
    console.log(chalk.default.red(err));
  });
}

function packAll() {
  console.log(chalk.default.yellow("Compiling..."));
  pack(mainConfig).then(() => {
    pack(renderConfig).then(() => {
      console.log(chalk.default.green("Compile success!"));
    }).catch((err) => {
      console.log(chalk.default.red(err));
    })
  }).catch((err) => {
    console.log(chalk.default.red(err));
  })
}

function pack(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        reject(err);
      }
      else if(stats.hasErrors()){
        let err = ''

        stats.toString({
          chunks: false,
          colors: true
        })
        .split(/\r?\n/)
        .forEach(line => {
          err += `    ${line}\n`
        })
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

start();