var bag = require('bagofcli');
var <%= params.projectClass %> = require('./<%= params.projectName %>');

function _do(args) {
  args = args || {};
  console.log('');
  new <%= params.projectClass %>().do(bag.exit);
}

/**
 * Execute <%= params.projectClass %> CLI.
 */
function exec() {

  var actions = {
    commands: {
      do: { action: _do }
    }
  };

  bag.command(__dirname, actions);
}

exports.exec = exec;
