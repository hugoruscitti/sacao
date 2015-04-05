import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    makeTestTaskRunning: function() {
      var task = this.store.createRecord('task', {
          title: 'Descargando Street Fighter 2',
          game: 'sf2',
          status: 'running',
          process: 50,
      });

      //task.save();
    },

    clear: function() {

      this.store.find('task').then(function(array) {
        array.forEach(function(record) {

          if (record.get('status') === 'error' ||  record.get('status') === 'done') {
            record.destroyRecord();
          }

        });

      }.bind(this));
    },

    makeTestTaskDone: function() {
      var task = this.store.createRecord('task', {
          title: 'Descargando Super Mario',
          game: 'sm',
          status: 'done',
          process: 100,
      });

      //task.save();
    },


    makeTestTaskError: function() {
      var task = this.store.createRecord('task', {
          title: 'Descargando Super MeatBoy',
          game: 'smb',
          status: 'error',
          process: 60,
      });

      //task.save();
    },


  }

});
