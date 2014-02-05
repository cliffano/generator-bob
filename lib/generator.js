var p = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

/**
 * class Generator
 *
 * @param {Object} args:
 * @param {Object} options:
 * @param {Object} config:
 */
function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
}

util.inherits(Generator, yeoman.generators.Base);

/**
 * Sets up user input prompts.
 */
Generator.prototype.askFor = function () {
  var cb = this.async();
  var prompts = [
    {
      name: 'projectName',
      message: 'Project name'
    },
    {
      name: 'projectDesc',
      message: 'Project description'
    },
    {
      name: 'authorName',
      message: 'Author name'
    },
    {
      name: 'authorEmail',
      message: 'Author email'
    },
    {
      name: 'authorWebsite',
      message: 'Author website'
    },
    {
      name: 'githubUsername',
      message: 'GitHub username'
    },
    {
      name: 'copyrightYear',
      message: 'Copyright year',
      default: (new Date()).getFullYear()
    },
    {
      type: 'confirm',
      name: 'hasCli',
      message: 'Has command-line interface?',
      default: true
    }
  ];

  this.prompt(prompts, function (params) {

    this.params = params;
    this.params.projectClass =
      this.params.projectName.charAt(0).toUpperCase() +
      this.params.projectName.slice(1).toLowerCase();
    this.params.projectTitle = this.params.projectClass;

    cb();
  }.bind(this));
};

/**
 * Creates directories and templatised files.
 * Also handles specific project types, e.g. projects having CLI.
 */
Generator.prototype.app = function () {

  this.mkdir('lib');
  this.mkdir('test');
  this.mkdir('test-integration');

  this.template('_.bob.json', '.bob.json');
  this.template('_.gitignore', '.gitignore');
  this.template('_.jshintrc', '.jshintrc');
  this.template('_.npmignore', '.npmignore');
  this.template('_.travis.yml', '.travis.yml');
  this.template('_CHANGELOG.md', 'CHANGELOG.md');
  this.template('_LICENSE', 'LICENSE');
  this.template('_README.md', 'README.md');
  this.template('_package.json', 'package.json');
  this.template(p.join('lib', '_project.js'), p.join('lib', this.params.projectName + '.js'));

  if (this.params.hasCli) {
    this.mkdir('bin');
    this.mkdir('conf');
    this.template(p.join('bin', '_project'), p.join('bin', this.params.projectName));
    this.template(p.join('conf', '_commands.json'), p.join('conf', 'commands.json'));
    this.template(p.join('lib', '_cli.js'), p.join('lib', 'cli.js'));
  }

};

module.exports = Generator;