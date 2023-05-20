const SELECTOR_ACCORDION = '.accordion'
const SELECTOR_TOGGLE = '.accordion__header'
const SELECTOR_ICON = '.accordion__icon'
const SELECTOR_CONTENT = '.accordion__content'
const CLASS_ICON_ACTIVE = 'accordion__icon_active'
const CLASS_OPEN_ACCORDION = 'accordion_open'

const EVENT_CLICK = 'click.accordion'

class Accodion{
  constructor($element){
    this.$accordion = $element;
    this.$icon = $element.find(SELECTOR_ICON);
    this.$content = this.$accordion.find(SELECTOR_CONTENT);
    this.$toggle = this.$accordion.find(SELECTOR_TOGGLE);
    this.transition = false;

    this._bindEvents()
  }


  _bindEvents(){
    this.$toggle.on( EVENT_CLICK, ()=> this.toggle() );
  }

  toggle(){
    if (this.transition) return;
    this.transition = true;

    this.$icon.toggleClass(CLASS_ICON_ACTIVE);
    
    this.$content.slideToggle(()=>{
      this.transition = false;
      this.$accordion.toggleClass(CLASS_OPEN_ACCORDION);
    })
  }
}

$(()=>{
  $(SELECTOR_ACCORDION).each(function() {
    new Accodion($(this))
  })
});