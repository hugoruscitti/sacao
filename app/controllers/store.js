import Ember from 'ember';

export default Ember.Controller.extend({
  status: null, // valores posibles null|'searching'|'done'|'error'
  gamelist: [],

  areSearching: function() {
    return this.get('status') === 'searching';
  }.property('status'),

  areNull: function() {
    return this.get('status') === null;
  }.property('status'),

  areDone: function() {
    return this.get('status') === 'done';
  }.property('status'),

  hasError: function() {
    return this.get('status') === 'error';
  }.property('status'),

  startSearch: function() {
    this.send('getGameList');
  }.on('init'),

  actions: {
    getGameList: function() {
      var controller = this;

      this.set('status', 'searching');

      function clearStore() {
        controller.store.find('store')
          .then(function(array) {
            array.forEach(function(record) {
              record.destroyRecord();
            });
          });
      }

      clearStore();

      function search() {
        jQuery.get('http://104.131.245.133:9841/games.json')
          .then(function(data) {

            data.games.results.forEach(function(e) {
              e.installed = false;
              e.processing = false;

              // Genera el registro en cache, pero no lo guarda.
              controller.store.createRecord('store', {
                title: e.title,
                depends: e.depends,
                originalname: e.file.originalname,
                url: 'http://104.131.245.133:9841/uploads/roms/' + e.file.filename,
                size: e.file.size,
                imageUrl: e.image.url,
                nick: e.nick,
                needUnzip: e.needUnzip,
                state: 'new',
                visible: e.visible,
              });

            });

            this.set('status', 'done');

          }.bind(this))
          .fail(function() {
            this.set('status', 'error');
          }.bind(this));
      }

      setTimeout(search.bind(this), 2000);
    }
  }
});
