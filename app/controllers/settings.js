import Ember from 'ember';

export default Ember.Controller.extend({
  borrando: false,

  actions: {

    loadFixture: function() {
      var records = [
        {
          name: 'Final Fight',
          ages: 31,
          url: 'http://i62.photobucket.com/albums/h86/cbrien2005/mame%20addicts/Rec%20Games/0030-ffight/02_zps8f8484bd.png~original'
        },
        {
          name: 'Street Fighter 2',
          ages: 31,
          url: 'http://cdn.toucharcade.com/wp-content/uploads/2011/09/SFIIColl_04.jpg'
        },
      ];

      records.forEach(function(e) {
        this.store.createRecord('person', e).save();
      }.bind(this));

    },

    clear: function() {
      console.log('do clear');
      this.set('borrando', true);

      this.store.find('person').then(function(array) {
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
