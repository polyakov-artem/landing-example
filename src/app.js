// Styles
import './app.scss'

// Common  Js
import importAll from '~js/importAll'

// Blocks
import '~js/blocks'

// Pages
import './pages/cards/cards'
import './pages/form-elements/form-elements'
import './pages/landing-page/landing-page'
import './pages/search-room/search-room'

// Dev-tools
import '~dev-tools/img-overlay/img-overlay'
import '~dev-tools/blocks-outline/blocks-outline'

// SVG images
importAll(require.context('svg-sprite-loader?sprite!~assets/svg/', true, /\.svg$/))