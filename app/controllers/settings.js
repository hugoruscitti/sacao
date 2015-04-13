import Ember from 'ember';

export default Ember.Controller.extend({
  borrando: false,

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
    }
  }
});
