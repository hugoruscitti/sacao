export default function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('about'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('index'),
    this.toRoute('settings'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('settings'),
    this.toRoute('about'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

}

