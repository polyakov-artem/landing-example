import Inputmask from "inputmask";
import '~node-modules/Inputmask/lib/extensions/inputmask.date.extensions';

$(function() {

  const maskConfig = {
    alias: "datetime",
    inputFormat: 'dd.mm.yyyy',
    placeholder: ' ',
  };

  $('.masked-input').each(function() {
    Inputmask(maskConfig).mask($(this).find('.input__control')[0]);
  });
})