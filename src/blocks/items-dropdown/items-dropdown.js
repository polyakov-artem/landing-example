import '~blocks/plain-dropdown/plain-dropdown'
import '~blocks/counter/counter'

const CLASS_ITEMS_DROPDOWN_OPEN = 'items-dropdown_is_open'
const CLASS_CLEAR_BTN_HIDDEN = 'items-dropdown__clear-btn_hidden'

const SELECTOR_ITEMS_DROPDOWN = '.items-dropdown'
const SELECTOR_ITEMS_DROPDOWN_CONTENT = '.items-dropdown__content'
const SELECTOR_ITEMS_DROPDOWN_INPUT = '.items-dropdown__control'
const SELECTOR_COUNTER = '.items-dropdown__counter'
const SELECTOR_COUNTER_INPUT = '.counter__control'
const SELECTOR_CLEAR_BTN = '.items-dropdown__clear-btn'
const SELECTOR_APPLY_BTN = '.items-dropdown__apply-btn'
const SELECTOR_DROPDOWN = '.plain-dropdown__toggle'

const DATA_KEY_PLACEHOLDER = 'placeholder'
const DATA_KEY_TYPE = 'dropdown-type'

const EVENT_KEY = `.items-dropdown`
const EVENT_INPUT = `input${EVENT_KEY}`
const EVENT_CLICK = `click${EVENT_KEY}`

const DROPDOWN_PLUGIN_NAME = 'plainDropdown'
const DROPDOWN_EVENT_OPEN = 'open.plainDropdown'
const DROPDOWN_EVENT_CLOSE = 'close.plainDropdown'
const DROPDOWN_ACTION_CLOSE = 'close'
const DROPDOWN_ACTION_OPEN = 'open'

const COUNTER_ACTION_RESET = 'reset'
const COUNTER_PLUGIN_NAME = 'counter'

const WORDS = {
  'спальни': ['спальня', 'спальни', 'спален'],
  'кровати': ['кровать', 'кровати', 'кроватей'],
  'ванные комнаты': ['ванная', 'ванные', 'ванн'],
  'взрослые': ['взрослый', 'взрослых', 'взрослых'],
  'дети': ['ребенок', 'детей', 'детей'],
  'младенцы': ['младенец', 'младенцев', 'младенцев'],
  'гости': ['гость', 'гостя', 'гостей']
};

const DEPENDENT_WORDS = [];


class ItemsDropdown {
  constructor($element) {
    this.$itemsDropdown = $element;
    this.$dropdown = $element.find(SELECTOR_DROPDOWN);
    this.$counterInputs = $element.find(SELECTOR_COUNTER_INPUT);
    this.$counters = $element.find(SELECTOR_COUNTER);
    this.$itemsDropdownInput = $element.find(SELECTOR_ITEMS_DROPDOWN_INPUT);

    this.$clearBtn = $element.find(SELECTOR_CLEAR_BTN);
    this.$applyBtn = $element.find(SELECTOR_APPLY_BTN);
    this.type = $element.data(DATA_KEY_TYPE);
    this.placeholder = this.$itemsDropdownInput.data(DATA_KEY_PLACEHOLDER);

    this._init();
    this._bindEvents();
  }

  _init() {

    this._setInputText();
    this._checkClearBtnState();
  }

  open() {
    this.$dropdown[DROPDOWN_PLUGIN_NAME](DROPDOWN_ACTION_OPEN)
  }

  close() {
    this.$dropdown[DROPDOWN_PLUGIN_NAME](DROPDOWN_ACTION_CLOSE)
  }

  _apply() {
    this.$dropdown[DROPDOWN_PLUGIN_NAME](DROPDOWN_ACTION_CLOSE)
  }

  clear() {
    this.$counters[COUNTER_PLUGIN_NAME](COUNTER_ACTION_RESET)
  }

  _checkClearBtnState() {
    (this.$itemsDropdownInput.val() === this.placeholder) 
      ? this.$clearBtn.addClass(CLASS_CLEAR_BTN_HIDDEN)
      : this.$clearBtn.removeClass(CLASS_CLEAR_BTN_HIDDEN)
  }

  _bindEvents() {
    this.$itemsDropdown
      .on(EVENT_INPUT, SELECTOR_COUNTER_INPUT, () => {
        this._setInputText();
        this._checkClearBtnState()
      })

    this.$applyBtn.on(EVENT_CLICK, () => this._apply())
    this.$clearBtn.on(EVENT_CLICK, () => this.clear())

    $(SELECTOR_ITEMS_DROPDOWN_CONTENT).click(function(e) {
      e.stopPropagation();
    });
  }

  _setInputText() {
    this.$itemsDropdownInput
      .val(this._getInputText())
      .trigger(EVENT_INPUT)
  }

  _isDependantItem(itemName){
    return DEPENDENT_WORDS.some((word)=>{
      return word == itemName
    })
  }

  _getInputText() {
    const data = this;
    let items = [];
    let dependentItems = [];
    let result = [];
    let sum;

    for (let i = 0; i < data.$counterInputs.length; i++) {
      const $input = $(data.$counterInputs[i]);
      const itemName = $input.prop('name');
      const itemValue = +$input.val();

      if (itemValue == 0) continue;

      if (this._isDependantItem(itemName)) {
        dependentItems.push({
          name: itemName,
          value: itemValue
        });

        continue;
      };

      items.push({
        name: itemName,
        value: itemValue
      })
    };


    if (!items.length) return data.placeholder;

    items = [...items, ...dependentItems];

    if (data.type === 'guests') {
      sum = items.reduce((total, currentItem) => total + currentItem.value, 0);
      result.push(data._getItemText('гости', sum));
    };

    if (data.type === 'items') {
      result = items.map((item) => {
        return data._getItemText(item.name, item.value)
      })
    };
    
    return result.join(', ')
  }

  _getItemText(name, number) {
    let properName = name;
    if (WORDS[name]) {
      properName = this._getProperName(WORDS[name], number)
    };

    return `${number} ${properName}`
  }

  _getProperName(names, number) {
    const cases = [2, 0, 1, 1, 1, 2];
    return names[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }
}

$(() => {

  $(SELECTOR_ITEMS_DROPDOWN).each(function() {
    new ItemsDropdown($(this))
  })

})


export { ItemsDropdown as default }