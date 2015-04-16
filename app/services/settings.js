import Ember from 'ember';

export default Ember.Service.extend({
  roms_path: ".sacao/roms",
  screenshots_path: ".sacao/screenshots",

  get_roms_path: function() {
    return this.get('roms_path');
  },

  get_screenshots_path: function() {
    return this.get('screenshots_path');
  },

  set_roms_path: function(value) {
    return this.set('roms_path', value);
  },

  set_screenshots_path: function(value) {
    return this.set('screenshots_path', value);
  }


});
