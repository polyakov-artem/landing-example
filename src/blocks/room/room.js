import { tns } from "~node-modules/tiny-slider/src/tiny-slider"

$(() => {
  $('.room__slider').each(function() {
    const slides = $(this).find('.tns__slides')[0];
    const controlsContainer = $(this).find('.tns__controls')[0];

    tns({
      container: slides,
      items: 1,
      controlsContainer: controlsContainer
    })
  })
})