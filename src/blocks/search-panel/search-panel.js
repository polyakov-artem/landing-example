const SELECTOR_SEARCH_PANEL = '.search-panel'
const SELECTOR_TOGGLE = '.search-panel__header'
const SELECTOR_CONTENT = '.search-panel__content'
const CLASS_OPEN_SEARCH_PANEL = 'search-panel_open'

const EVENT_CLICK = 'click.search-panel'

class SearchPanel {
  constructor($element) {
    this.$searchPanel = $element;
    this.$content = this.$searchPanel.find(SELECTOR_CONTENT);
    this.$toggle = this.$searchPanel.find(SELECTOR_TOGGLE);

    this._bindEvents()
  }

  _bindEvents() {
    this.$toggle.on(EVENT_CLICK, () => this.toggle());
  }

  toggle() {
    this.$searchPanel.toggleClass(CLASS_OPEN_SEARCH_PANEL);
  }
}

$(() => {
  $(SELECTOR_SEARCH_PANEL).each(function() {
    new SearchPanel($(this))
  })
});