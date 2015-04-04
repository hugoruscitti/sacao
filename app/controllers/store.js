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

  actions: {
    getGameList: function() {
      this.set('gameList', []);
      this.set('status', 'searching');

      jQuery.get('http://104.131.245.133:9841/games.json')
        .then(function(data){
          this.set('gamelist', data.games);
          this.set('status', 'done');
        }.bind(this))
        .fail(function() {
          this.set('status', 'error');
        }.bind(this));
    }
  }
});
