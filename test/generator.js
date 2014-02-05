var buster = require('buster-node');
var Generator = require('../lib/generator');
var referee = require('referee');
var yeoman = require('yeoman-generator');
var assert = referee.assert;

buster.testCase('generator - askFor', {
  setUp: function () {
    this.mockBase = this.mock(yeoman.generators.Base);
    this.mockBase.expects('apply').once();
  },
  'should set prompts': function (done) {
    var generator = new Generator();
    
    generator.async = function () {
      return function () {
        assert.equals(generator.params.projectClass, 'Someproject');
        assert.equals(generator.params.projectTitle, 'Someproject');
        done();
      };
    };

    generator.params = {
      hasCli: false,
      projectName: 'someproject'
    };

    generator.prompt = function (prompts, cb) {
      assert.isTrue(prompts.length > 0);
      cb(generator.params);
    };

    generator.askFor();
  }
});

buster.testCase('generator - app', {
  setUp: function () {
    this.mockBase = this.mock(yeoman.generators.Base);
    this.mockBase.expects('apply').once();
    this.generator = new Generator();
  },
  'should create baseline directories and template files': function () {
    this.generator.params = {
      hasCli: false,
      projectName: 'someproject'
    };

    var dirs = [];
    this.generator.mkdir = function (dir) {
      dirs.push(dir);
    };

    var srcs = [];
    var dests = [];
    this.generator.template = function (src, dest) {
      srcs.push(src);
      dests.push(dest);
    };

    this.generator.app();

    assert.isTrue(dirs.length > 0);
    assert.isTrue(srcs.length > 0);
    assert.isTrue(dests.length > 0);
  },
  'should handle CLI project set up': function () {
    this.generator.params = {
      hasCli: true,
      projectName: 'someproject'
    };

    var dirs = [];
    this.generator.mkdir = function (dir) {
      dirs.push(dir);
    };

    var srcs = [];
    var dests = [];
    this.generator.template = function (src, dest) {
      srcs.push(src);
      dests.push(dest);
    };

    this.generator.app();

    assert.isTrue(dirs.indexOf('bin') !== -1);
    assert.isTrue(dirs.indexOf('conf') !== -1);
    assert.isTrue(srcs.indexOf('bin/_project') !== -1);
    assert.isTrue(srcs.indexOf('conf/_commands.json') !== -1);
    assert.isTrue(srcs.indexOf('lib/_cli.js') !== -1);
    assert.isTrue(dests.indexOf('bin/someproject') !== -1);
    assert.isTrue(dests.indexOf('conf/commands.json') !== -1);
    assert.isTrue(dests.indexOf('lib/cli.js') !== -1);
  }
});