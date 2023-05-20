import '~node-modules/air-datepicker/dist/js/datepicker';

const options = {
  range: true,
  inline: true,
  classes: "datepicker_skin_toxin",
  multipleDatesSeparator: " - ",
  selectOtherMonths: true,
  selectOtherYears: true,
  prevHtml: '<i class="datepicker__nav-icon datepicker__icon-backward"></i>',
  nextHtml: '<i class="datepicker__nav-icon datepicker__icon-forward"></i>',
  navTitles: {
    days: 'MM <i>yyyy</i>',
  },
};

class Calendar {
  constructor($element) {
    this.$calendar = $element;
    this.$datepicker = $element.find('.calendar__datepicker');

    this._init();
    this._bindEvents();
  }

  _init() {
    this.$datepickerInstance = this.$datepicker.datepicker(options).data('datepicker')
  }

  _bindEvents() {
    const $clearBtn = this.$calendar.find('.calendar__clear-btn');
    $clearBtn.click(() => this.$datepickerInstance.clear())
  }
}

$(() => {
  $('.calendar').each(function() {
    new Calendar($(this))
  })
});