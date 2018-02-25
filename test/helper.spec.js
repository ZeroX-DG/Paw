let assert = require('assert');
let path = require('path');
let {getLibVersion} = require('../src/renderer/core/helper');

describe('getLibVersion', function() {
  it('should return the correct version of library', function() {
    let version = getLibVersion(
      path.resolve(__dirname, '..', 'src/static/libraries', 'p5.js')
    );
    // this is the default p5.js version being leased along with the app
    let default_version = 'v0.6.0';
    assert.equal(version, default_version);
  });
});