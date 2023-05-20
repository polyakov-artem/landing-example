const PLUGIN_NAME = 'plainDropdown'
const DATA_API_KEY = 'plainDropdown'

const CLASS_DROPDOWN = 'plain-dropdown';
const CLASS_DROPDOWN_OPEN = 'plain-dropdown_is_open';
const CLASS_TOGGLE = 'plain-dropdown__toggle';

const SELECTOR_DROPDOWN = '.plain-dropdown';
const SELECTOR_TOGGLE = '.plain-dropdown__toggle';
const SELECTOR_DROPDOWN_OPEN = '.plain-dropdown_is_open';

const EVENT_CLICK = 'click.plainDropdown';
const EVENT_OPEN = 'open.plainDropdown';
const EVENT_CLOSE = 'close.plainDropdown';


class PlainDropdown {
  constructor($element, options){
    this.$dropdown = $element;
    this.options = options;
  }

  close(){
    this.$dropdown
      .removeClass(CLASS_DROPDOWN_OPEN)
      .trigger(EVENT_CLOSE);
  }

  open(){
    this.$dropdown
      .addClass(CLASS_DROPDOWN_OPEN)
      .trigger(EVENT_OPEN);
  }

  toggle(){
    this.$dropdown.hasClass(CLASS_DROPDOWN_OPEN)
      ? this.close()
      : this.open()
  }

  static _documentClickHandler(e) {
    const $clicked = $(e.target);
    const $clickedDropdown = $clicked.closest(SELECTOR_DROPDOWN);
    const $clickedDropdownParents = $clickedDropdown.parents(SELECTOR_DROPDOWN);

    const $toggle = $clicked.closest(SELECTOR_TOGGLE);

    $(SELECTOR_DROPDOWN)
      .not($clickedDropdownParents.toArray())
      .not($clickedDropdown.toArray())
      .plainDropdown('close');

    if ($toggle.length) $clickedDropdown.plainDropdown('toggle');
  }


  static _jQueryInterface(optsOrMethod) {
    const args = arguments;

    return this.each(function() {
      const $element = $(this);
      let data = $element.data(DATA_API_KEY);

      if (!data) {
        const options = $.extend({}, $.fn[PLUGIN_NAME].defaults, optsOrMethod);
        data = new PlainDropdown($element, options)
        $element.data(DATA_API_KEY, data)
      };

      if (typeof optsOrMethod === 'string' && typeof data[optsOrMethod] !== 'undefined') {
        data[optsOrMethod](Array.prototype.slice.call(args, 1))
      }
    })
  }
};

$.fn[PLUGIN_NAME] = PlainDropdown._jQueryInterface;
$.fn[PLUGIN_NAME].Constructor = PlainDropdown;
$.fn[PLUGIN_NAME].noConflict = () => {
  $.fn[PLUGIN_NAME] = JQUERY_NO_CONFLICT;
  return PlainDropdown._jQueryInterface
};


$(() => {
  $(SELECTOR_DROPDOWN).plainDropdown();
  $(document).on(EVENT_CLICK, PlainDropdown._documentClickHandler)
});



export { PlainDropdown as default }