const expect = require('chai').expect;
const path = require('path');
const libManager = require('../src/renderer/core/libManager');
const randomId = require('../src/renderer/core/helper');
const mock = require('mock-fs');
const fse = require('fs-extra');

let mock_project;

describe('libManager', function() {

  describe('addLibToFolder', function() {

    beforeEach(function() {
      mock({
        'testProjectPath': {
          'libraries': {},
          'index.html': '<html><head></head><body></body></html>'
        }
      });
      mock_project = {
        _id: randomId.generateID(),
        name: 'TestProject',
        path: 'testProjectPath/'
      };
    });

    it('return a boolean', function() {
      let result = libManager.addLibToFolder('p5.js', mock_project.path);
      expect(typeof(result)).to.equal('boolean');
    });

    it('copy the correct library', function() {
      let lib_path = path.resolve(mock_project.path, 'libraries', 'p5.js');
      // ensure that the library is not exists
      expect(fse.pathExistsSync(lib_path)).to.equal(false);
      let result = libManager.addLibToFolder('p5.js', mock_project.path);
      // ensure that the function executed correctly
      expect(result).to.equal(true);
      // ensure that the previous library is now exists
      expect(fse.pathExistsSync(lib_path)).to.equal(true);
    });

    it('return false when move failed', function() {
      let result = libManager.addLibToFolder('fake.js', mock_project.path);
      expect(result).to.equal(false);
    });
    afterEach(mock.restore);
  });

  describe('removeLibFromFolder', function() {

    beforeEach(function() {
      mock({
        'testProjectPath': {
          'libraries': {
            'p5.js': 'test'
          },
          'index.html': '<html><head></head><body></body></html>'
        }
      });
      mock_project = {
        _id: randomId.generateID(),
        name: 'TestProject',
        path: 'testProjectPath'
      };
    });

    it('return a boolean', function() {
      let result = libManager.removeLibFromFolder('p5.js', mock_project.path);
      expect(typeof(result)).to.equal('boolean');
    });

    it('remove the correct library', function() {
      let lib_path = path.resolve(mock_project.path, 'libraries', 'p5.js');
      expect(fse.pathExistsSync(lib_path)).to.equal(true);
      let result = libManager.removeLibFromFolder('p5.js', mock_project.path);
      expect(fse.pathExistsSync(lib_path)).to.equal(false);
    });
    afterEach(mock.restore);
  });
});