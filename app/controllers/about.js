import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    
    abrirModalNuevo: function() {
      this.showModal('modal');
    },

    testDownload: function() {
      var url = 'http://104.131.245.133:9841/uploads/roms/ac814950da731563049e10843678cd94.zip';

      var fs = require('fs');
      var request = require('request');
      var progress = require('request-progress');

      var task = this.store.createRecord('task', {
            title: 'Descargando Street Fighter 2',
            game: 'sf2',
            status: 'running',
            process: 0,
      });

      progress(request(url), {
          throttle: 1000,
          delay: 2000
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
      })
    }
  }
});
