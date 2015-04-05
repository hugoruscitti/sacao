import Ember from 'ember';

export default Ember.Service.extend({
  updates: -3,
  storeService: null,

  // Función que asocia el store para acceder a los
  // datos de la aplicación. Lo invoca controlador
  // de la aplicación.
  setStore: function(store) {
    this.set('storeService', store);

    this.updateUpdatesCounter();
  },

  /*
  startService: function() {

    setInterval(function() {
      this.incrementProperty('updates');
    }.bind(this), 1000);

  }.on('init'),
  */

  updateUpdatesCounter: function() {
    console.log("Consultando cantidad de tareas en estado 'running' ...");

    function only_running_filter(record) {
      return (record.get('status') === 'running');
    }

    this.get('storeService')
      .filter('task', only_running_filter)
      .then(function(data) {

      this.set('updates', data.get('length'));

      setTimeout(function() {
        this.updateUpdatesCounter();
      }.bind(this), 2000);

    }.bind(this));
  },

});
