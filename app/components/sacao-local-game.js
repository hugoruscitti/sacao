import Ember from 'ember';
var path = require('path');

var ROMS_PATH = path.join(process.env.HOME, ".sacao/roms");
var spawn = require('child_process').spawn;

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['juego'],

  actions: {
    run: function() {
      var nick = this.get('model.nick');

      var program = spawn('mame', [nick, '-skip_gameinfo', '-rompath', ROMS_PATH]);

      program.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });

      program.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });

      program.on('close', function (code) {
        console.log('child process exited with code ' + code);
      });

    },
  }
});
