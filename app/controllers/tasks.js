import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    clear: function() {

      this.store.find('task').then(function(array) {
        array.forEach(function(record) {

          if (record.get('status') === 'error' ||  record.get('status') === 'done') {
            record.destroyRecord();
          }

        });

      }.bind(this));
    },

  }

});
