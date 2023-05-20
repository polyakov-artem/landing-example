$(() => {
  $('.form-elements__filter-date-dropdown .calendar__datepicker').each(function() {
    $(this).data('datepicker').selectDate([new Date(2020, 7, 19), new Date(2020, 7, 23)]);
  })

  $('.form-elements__date-dropdown .calendar__datepicker').each(function() {
    $(this).data('datepicker').selectDate(new Date(2019, 7, 19));
  })

})