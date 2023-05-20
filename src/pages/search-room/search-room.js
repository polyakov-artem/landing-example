$(() => {
  $('.search-panel__dates .calendar__datepicker').each(function() {
    $(this).data('datepicker').selectDate([new Date(2020, 7, 19), new Date(2020, 7, 23)]);
  })

})

function getParameters() {
  return Object.fromEntries(new URLSearchParams(window.location.search));
}