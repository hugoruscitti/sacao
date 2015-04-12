import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  depends: DS.attr('string'),
  originalname: DS.attr('string'),
  url: DS.attr('string'),
  size: DS.attr('string'),
  imageUrl: DS.attr('string'),
  nick: DS.attr('string'),
  needUnzip: DS.attr('boolean'),
  state: DS.attr('string'),
  visible: DS.attr('boolean')
});
