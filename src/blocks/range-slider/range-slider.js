import '~node-modules/ion-rangeslider/js/ion.rangeSlider'

const options = {
  type: "double",
  skin: "round",
  min: 0,
  max: 16667,
  from: 5000,
  to: 10800,
  drag_interval: false,
  min_interval: null,
  max_interval: null,
  hide_min_max: true,
  hide_from_to: true,
  onStart: setOutput,
  onChange: setValues,
  extra_classes: 'irs_theme_green irs_size_m',
  prettify_enabled: false
};

function setOutput(data) {
  const $input = data.input;
  const $outputField = $input.closest('.range-slider').find('.range-slider__values');
  $input.data('$outputField', $outputField);
  setValues(data)
};

function setValues(data) {
  data.input.data('$outputField').text(`${numberWithSpaces(data.from)}₽ - ${numberWithSpaces(data.to)}₽`)
};

function numberWithSpaces(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

$(() => {
  $(".range-slider__input").each(function() {
    $(this).ionRangeSlider(options)
  })
})