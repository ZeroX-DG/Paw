const electron = require('electron');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { APP } = require('../src/config');
const mainConfig = require('./main.dev.config');
const rendererConfig = require('./renderer.dev.config');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const chalk = require('chalk');


function log(proc, data) {
  let log = ''

  log += chalk.yellow.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`)
  log += '\n\n'

  if (typeof data === 'object') {
    data.toString({
      colors: true,
      chunks: false
    }).split(/\r?\n/).forEach(line => {
      log += '  ' + line + '\n'
    })
  } else {
    log += `  ${data}\n`
  }

  log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'

  console.log(log)
}

function startRenderer() {
  return new Promise(function(resolve, reject){

    rendererConfig.entry.renderer.push(path.join(__dirname, 'dev-client'));

    const compiler = webpack(rendererConfig);
    
    let hotMiddleware = webpackHotMiddleware(compiler, { 
      log: false, 
      heartbeat: 2500 
    });

    compiler.plugin('done', stats => {
      log('renderer', stats);
    });

    const server = new WebpackDevServer(
      compiler,
      {
        contentBase: path.join(__dirname, '..', 'dist'),
        quiet: true,
        hot: true,
        compress: true,
        before (app, ctx) {
          ctx.middleware.waitUntilValid(() => {
            resolve()
          })
        }
      }
    )

    server.listen(APP.port);
  });
}

function startMain() {
  require('spawn-auto-restart')({
    debug: true,
    proc: {
      command: electron,
      args: [mainConfig.main, '--dev'],
    },
    watch: mainConfig.watch,
  });
}

function init() {
  startRenderer().then(startMain());
}

init();