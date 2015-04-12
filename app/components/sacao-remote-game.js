import Ember from 'ember';

var fs = require('fs');
var request = require('request');
var progress = require('request-progress');

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['juego'],

  processing: function() {
    return (this.get('model.status') === "downloading");
  }.property('model.status'),

  installed: function() {
    return (this.get('model.status') === "installed");
  }.property('model.status'),

  actions: {
    download: function() {
      var controller = this;
      var url = this.get('model.url');

      var task = this.store.createRecord('task', {
        title: 'Descargando ' + this.get('model.nick'),
        game: this.get('model.nick'),
        status: 'running',
        process: 0,
      });

      this.set('model.status', 'downloading');

      progress(request(url), {
        throttle: 10,
        delay: 10
      })
      .on('progress', function (state) {
        task.set('process', state.percent);
      })
      .on('error', function (err) {
        task.set('status', 'error');
      })
      .pipe(fs.createWriteStream('doodle.png'))
      .on('error', function (err) {
        task.set('status', 'error');
      })
      .on('close', function (err) {
        task.set('process', 100);
        task.set('status', 'done');

        controller.set('model.status', 'installed');
      });
    }
  }
});
