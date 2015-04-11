import Ember from 'ember';

export default Ember.Controller.extend({
  status: null, // valores posibles null|'searching'|'done'|'error'
  gamelist: [],
  //store: Ember.inject.service(),

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
      this.set('gameList', []);
      this.set('status', 'searching');

      function search() {
        jQuery.get('http://104.131.245.133:9841/games.json')
          .then(function(data){
            this.set('gamelist', data.games.results);
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
