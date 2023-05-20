$(() => {
  const params = getParameters();

  $('.landing-page .items-dropdown').each(function() {
    const $dropdown = $(this);
    const adultsCounter = $dropdown.find('[name="взрослые"]').closest('.counter');
    const childrenCounter = $dropdown.find('[name="дети"]').closest('.counter');
    const babyCounter = $dropdown.find('[name="младенцы"]').closest('.counter');

    if (params['items-dropdown_open']) $dropdown.plainDropdown("open");
    if (params['adults']) adultsCounter.counter("set", 2);
    if (params['children']) childrenCounter.counter("set", 1);
  })


  $('.landing-page .date-dropdown').each(function() {
    const $dropdown = $(this);
    const $calendarInstance = $(this).find('.calendar__datepicker').data('datepicker');
    const arrival = params.arrival;
    const depurture = params.depurture;

    if (params['date-dropdown_open']) $dropdown.plainDropdown("open");
    if (arrival) $calendarInstance.selectDate(new Date(arrival));
    if (depurture) $calendarInstance.selectDate(new Date(depurture));
  })

})

function getParameters() {
  return Object.fromEntries(new URLSearchParams(window.location.search));
}