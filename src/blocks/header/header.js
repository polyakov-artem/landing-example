const SELECTOR_MENU = '.header'
const SELECTOR_LINK = '.header__link'
const SELECTOR_TOGGLER = '.header__toggler'
const SELECTOR_SUBMENU_OPEN = '.header__submenu_open'

const CLASS_MENU_ACTIVE = 'header_active'
const CLASS_TOGGLER_ACTIVE = 'hamburger_active'
const CLASS_SUBMENU = 'header__submenu'
const CLASS_SUBMENU_OPEN = 'header__submenu_open'

class Header {
  constructor($element) {
    this.bindEvents($element);
  }

  bindEvents($menu) {
    const $links = $menu.find(SELECTOR_LINK)
      .click((e)=>this.clickHandler(e))

    $menu.find(SELECTOR_TOGGLER)
      .click(this.hamburgerClickHandler)
  }

  hamburgerClickHandler(){
    $(this).toggleClass(CLASS_TOGGLER_ACTIVE)
      .closest(SELECTOR_MENU).toggleClass(CLASS_MENU_ACTIVE);
  }

  clickHandler(e) {
    const $link =  $(e.currentTarget);
    const $listItem =  $link.parent();
    const hasSubmenu = $listItem.hasClass(CLASS_SUBMENU);

    if (hasSubmenu) {
      $listItem.toggleClass(CLASS_SUBMENU_OPEN);
      e.preventDefault();
    }
  }
}

$(() => {
  $(SELECTOR_MENU).each(function() {
    new Header($(this))
  })
})