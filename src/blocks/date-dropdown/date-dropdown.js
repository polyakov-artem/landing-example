import Inputmask from "inputmask"
import "~blocks/calendar/calendar"

const CLASS_DATE_DROPDOWN_OPEN = 'date-dropdown_is_open'
const SELECTOR_DATE_DROPDOWN = '.date-dropdown'
const SELECTOR_DATE_DROPDOWN_INPUT = '.date-dropdown__date'
const SELECTOR_DATEPICKER = '.calendar__datepicker'
const SELECTOR_CLEAR_BTN = '.calendar__clear-btn'
const SELECTOR_APPLY_BTN = '.calendar__apply-btn'
const SELECTOR_ARRIVAL_INPUT = '[data-date="arrival"]'
const SELECTOR_DEPURTURE_INPUT = '[data-date="depurture"]'
const DROPDOWN_PLUGIN_NAME = 'plainDropdown'
const DROPDOWN_EVENT_OPEN = 'open.plainDropdown'
const DROPDOWN_EVENT_CLOSE = 'close.plainDropdown'
const DROPDOWN_ACTION_CLOSE = 'close'
const EVENT_KEY           = `.date-dropdown`
const EVENT_INPUT          = `input${EVENT_KEY}`
const EVENT_CLICK          = `click${EVENT_KEY}`
const API_KEY_DATEPICKER = 'datepicker'

class DateDropdown{
  constructor($element){
    this.$dropdown = $element;
    this.$datepicker = $element.find(SELECTOR_DATEPICKER);
    this.datepickerInstance = this.$datepicker.data(API_KEY_DATEPICKER);
    this.datepickerOptions = this.datepickerInstance.opts;

    this.$clearBtn = $element.find(SELECTOR_CLEAR_BTN);
    this.$applyBtn = $element.find(SELECTOR_APPLY_BTN);
    this.$inputs = $element.find(SELECTOR_DATE_DROPDOWN_INPUT);
    this.$arrivalInput = $element.find(SELECTOR_ARRIVAL_INPUT);
    this.$depurtureInput = $element.find(SELECTOR_DEPURTURE_INPUT);
    this.type = (this.$inputs.length > 1)? 'double': 'single';

    this._init();
    this._bindEvents();
  }

  _init(){
    if (this.type === 'single') {
      this.datepickerOptions.dateFormat = this.datepickerInstance.loc.dateFormat = 'dd M'
    };

    this.datepickerOptions.onSelect = this._selectHandler.bind(this);

    this._addMask();
  }

  _addMask(){
    if (this.type === 'double'){
      Inputmask("99.99.9999", { "placeholder": "ДД.ММ.ГГГГ" }).mask([...this.$inputs]);

    } else {
      Inputmask("99 aaa - 99 aaa", { "placeholder": " " }).mask([...this.$inputs]);
    }
  }


  _bindEvents(){
     
    this.$datepicker.on(EVENT_CLICK, (e) => e.stopPropagation() );

    this.$applyBtn.on(EVENT_CLICK, () => {
      this.$dropdown[DROPDOWN_PLUGIN_NAME](DROPDOWN_ACTION_CLOSE)
    })
  }

  _selectHandler(formattedDate, date, inst){
    if (this.type === 'double') {
      const dates = formattedDate.split(' - ');
      this.$depurtureInput.val(dates[0]);
      this.$arrivalInput.val(dates[1]);
    } else {
      this.$inputs.val(formattedDate.toLowerCase());
    };
  }

}

$(()=>{
  $(SELECTOR_DATE_DROPDOWN).each(function(){
    new DateDropdown($(this))
  })
})


export {DateDropdown as default}