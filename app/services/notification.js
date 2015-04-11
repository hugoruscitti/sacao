import Ember from 'ember';

export default Ember.Service.extend({
  updates: 0,
  storeService: null,
  task: 0,

  // Función que asocia el store para acceder a los
  // datos de la aplicación. Lo invoca controlador
  // de la aplicación.
  setStore: function(store) {
    this.set('storeService', store);

    this.updateUpdatesCounter();
  },

  updateUpdatesCounter: function() {
    console.log("Consultando cantidad de tareas en estado 'running' ...");

    function only_running_filter(record) {
      return (record.get('status') === 'running');
    }

    this.get('storeService')
      .filter('task', only_running_filter)
      .then(function(data) {
        this.set('task', data.get('length'));
      }.bind(this));


    // Solicita volver a actualizar los contadores.
    setTimeout(function() {
      this.updateUpdatesCounter();
    }.bind(this), 2000);

  },

});
