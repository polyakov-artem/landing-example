$(() => {
  $('.booking-block__date-dropdown .calendar__datepicker').each(function() {
    $(this).data('datepicker').selectDate([new Date(2019, 7, 19), new Date(2019, 7, 23)]);
  });

  $('.cards__calendar .calendar__datepicker').each(function() {
    $(this).data('datepicker').selectDate([new Date(2019, 7, 19), new Date(2019, 7, 23)]);
  })
})