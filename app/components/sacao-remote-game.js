import Ember from 'ember';

var path = require('path');




export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['juego'],

  request: Ember.inject.service(),

  processing: function() {
    return (this.get('model.status') === "downloading");
  }.property('model.status'),

  installed: function() {
    return (this.get('model.status') === "installed");
  }.property('model.status'),

  settings: Ember.inject.service(),


  actions: {
    download: function() {
      var controller = this;
      //var id = this.get('model.id');
      var url = this.get('model.url');
      var image_url = this.get('model.imageUrl');

      var ROMS_PATH = this.settings.get_roms_path();
      var SCREENSHOTS_PATH = this.settings.get_screenshots_path();

      var destination_path = path.join(process.env.HOME, ROMS_PATH, this.get('model.originalname'));
      var screenshots_path = path.join(process.env.HOME, SCREENSHOTS_PATH, this.get('model.originalname').replace('.zip', '.png'));

      var task = this.store.createRecord('task', {
        title: 'Descargando ' + this.get('model.nick'),
        game: this.get('model.nick'),
        status: 'running',
        process: 0,
      });

      this.set('model.status', 'downloading');

      function on_progress(state) {
        task.set('process', state.percent);
      }

      function on_success() {
        task.set('process', 100);
        task.set('status', 'done');
        controller.set('model.status', 'installed');

        controller.store.createRecord('game', {
          title: controller.get('model.title'),
          image: "file://" + screenshots_path,
          nick: controller.get('model.nick'),
        }).save();

      }

      function on_error(err) {
        task.set('status', 'error');
        controller.set('model.status', 'available');
        controller.wuphf.danger(err.message);
        console.error(err);
      }

      // Intenta bajar la captura de pantalla y
      // luego el archivo .zip del juego.
      controller.get('request')
        .download(image_url, null, screenshots_path)
        .then(function() {

          controller.get('request')
            .download(url, on_progress, destination_path)
            .then(on_success, on_error);

        }, on_error);



    }
  }
});
