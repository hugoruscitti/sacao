import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  ages: DS.attr('string'),
  rev: DS.attr('string'),
  url: DS.attr('string')
});
