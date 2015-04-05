import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sacao-updates'],

  notification: Ember.inject.service('notification'),

  hasUpdates: function() {
    return this.get('notification.updates') > 0;
  }.property('notification.updates')

});
