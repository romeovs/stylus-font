import data from './data'

// the preferred order for font types
const order = [
  'embedded-opentype'
, 'woff2'
, 'woff'
, 'truetype'
, 'opentype'
, 'svg'
, 'afm'
]

// gets the preference index
const index = function (def) {
  if ( def.local ) {
    // local fonts go to front!!
    return -2
  } else if ( def.data ) {
    // data fonts go second
    return -1
  } else {
    return order.indexOf(def.format) + 1 || Infinity
  }
}

// sorts the array by format
export default function (a, b) {
  return index(a) - index(b)
}

