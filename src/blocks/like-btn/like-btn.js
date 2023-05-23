const 
  SELECTOR_BUTTON = '.like-btn',
  SELECTOR_CONTROL = '.like-btn__control',
  SELECTOR_COUNTER = '.like-btn__counter',
  CLASS_CHECKED = 'like-btn_checked',
  CLASS_FOCUSED = 'like-btn_focused';

class LikeBtn {
  constructor($element) {
    this.$btn = $element;
    this.$control = $element.find(SELECTOR_CONTROL);
    this.$counter = $element.find(SELECTOR_COUNTER);
    this.isChecked = $element.hasClass(CLASS_CHECKED);
    this.value = +this.$counter.text();

    this.bindEvents()
  }

  bindEvents() {
    this.$control.change(() => this.changeHandler());
    this.$control.focus(() => this.focusHandler())
    this.$control.blur(() => this.blurHandler())
  }

  changeHandler() {

    if (this.isChecked) {
      this.$counter.text(--this.value)
    } else {
      this.$counter.text(++this.value)
    }

    this.$btn.toggleClass(CLASS_CHECKED);
    this.isChecked = !this.isChecked;
  }

  focusHandler() {
    this.$btn.addClass(CLASS_FOCUSED);
  }

  blurHandler() {
    this.$btn.removeClass(CLASS_FOCUSED);
  }
  
}


$(() => {
  $(SELECTOR_BUTTON).each(function() {
    new LikeBtn($(this))
  })
})