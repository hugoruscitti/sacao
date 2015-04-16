import Ember from 'ember';

export default Ember.Controller.extend({
  borrando: false,
  settings: Ember.inject.service('settings'),
  roms_path: '',
  screenshots_path: '',

  canSave: function() {

    if (this.get('roms_path') === this.get('settings').get_roms_path() &&
        this.get('screenshots_path') === this.get('settings').get_screenshots_path()) {
        return false;
      }
    else {
      return true;
    }
  }.property('roms_path', 'screenshots_path'),

  initialSetup: function() {
    this.set('roms_path', this.get('settings').get_roms_path());
    this.set('screenshots_path', this.get('settings').get_screenshots_path());
  }.on('init'),


  actions: {

    clear: function() {
      this.set('borrando', true);

      this.store.find('game').then(function(array) {
        array.forEach(function(record) {
          record.destroyRecord();
        });

        setTimeout(function() {
          this.set('borrando', false);
        }.bind(this), 1000);

      }.bind(this));
    },


    save: function() {
       this.get('settings').set_roms_path(this.get('roms_path'));
       this.get('settings').set_screenshots_path(this.get('screenshots_path'));

       // TODO: Actualizar la propiedad 'canSave' para que se vuelva a evaluar,
       // ya que no se llama, y eso hace que el botón siga apareciendo habilitado.
    }
  }

});
