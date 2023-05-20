const PLUGIN_NAME = 'counter'
const DATA_KEY = 'counter'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = $.fn[PLUGIN_NAME]
const EVENT_BLUR = `blur${EVENT_KEY}`
const EVENT_CLICK = `click${EVENT_KEY}`
const CLASS_BTN_DISABLED = 'btn_disabled'
const SELECTOR_COUNTER = '.counter'
const SELECTOR_INPUT = '.counter__control'
const SELECTOR_BTN = '.counter__btn'
const SELECTOR_MINUS_BTN = '[data-operator = "minus"]'



class Counter {
  constructor($elem, options) {
    this.$element = $elem;
    this.$input = $elem.find(SELECTOR_INPUT);
    this.$minusBtn = $elem.find(SELECTOR_MINUS_BTN);
    this.options = options;

    this._bindEvents();
    this._checkBtnState(+this.$input.val())
  }

  _bindEvents() {
    this.$input.on(EVENT_BLUR, () => this._validateInput());
    this.$element.on(EVENT_CLICK, SELECTOR_BTN, (e) => this._clickHandler(e));
  }

  _validateInput() {
    const value = this.$input.val();
    this.set(value);
    if (value.length > 1 && value[0] == "0") this.$input.val(parseInt(value))
  }

  _isValid(value) {
    return (!isNaN(parseFloat(value)) && isFinite(value) && value >= 0)
  }

  _clickHandler(e) {
    const operator = $(e.currentTarget).data('operator');
    const data = this;

    switch (operator) {
      case "minus":
        data.decrease()
        break;

      case "plus":
        data.increase()
        break;
    }
  }

  decrease() {
    let value = +this.$input.val();
    if (value === 0) return;
    this.set(--value)
  }

  increase() {
    let value = +this.$input.val();
    this.set(++value)
  }

  set(value) {
    let nextValue = +value;
    if (!this._isValid(value)) nextValue = 0;
    this._changeValue(nextValue);
    this._checkBtnState(value);
  }

  _changeValue(value) {
    this.$input
      .val(value)
      .trigger("input");
  }

  _checkBtnState(value) {
    if (value <= 0) {
      this._disableMinusBtn();
    } else {
      this._enableMinusBtn();
    }
  }


  reset() {
    this.set(0)
  }

  _disableMinusBtn() {
    this.$minusBtn.addClass(CLASS_BTN_DISABLED).prop("disabled", true);
  }

  _enableMinusBtn() {
    this.$minusBtn.removeClass(CLASS_BTN_DISABLED).prop("disabled", false);
  }

  static _jQueryInterface(optsOrMethod) {
    const args = arguments;
    return this.each(function() {
      const $element = $(this);
      let data = $element.data(DATA_KEY);

      if (!data) {
        const options = $.extend({}, $.fn[PLUGIN_NAME].defaults, optsOrMethod);
        data = new Counter($element, options)
        $element.data(DATA_KEY, data)
      };

      if (typeof optsOrMethod === 'string' && typeof data[optsOrMethod] !== 'undefined') {
        data[optsOrMethod](Array.prototype.slice.call(args, 1))
      }
    })
  }
};

$.fn[PLUGIN_NAME] = Counter._jQueryInterface;
$.fn[PLUGIN_NAME].Constructor = Counter;
$.fn[PLUGIN_NAME].noConflict = () => {
  $.fn[PLUGIN_NAME] = JQUERY_NO_CONFLICT
  return Counter._jQueryInterface
};

$(() => { $(SELECTOR_COUNTER).counter() });