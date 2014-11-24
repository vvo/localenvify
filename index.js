var localenv = require('localenv/noload');
var path = require('path');

module.exports = function localenvify(file, opts) {
  if (!opts.envfile) {
    opts.envfile = '.env';
  }

  opts.envfile = path.resolve(process.cwd(), opts.envfile);

  localenv.inject_env(opts.envfile);

  return require('envify')();
};
