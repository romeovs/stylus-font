import stylus from 'stylus'
import mime   from 'mime'
import path   from 'path'

const data = function (uri) {
  const matched = uri.match(/^data:([^,;]+);(.*)$/)
  if ( matched ) {
    return {
      type: matched[1]
    , data: matched[2]
    }
  } else {
    return false
  }
}

const extre = /(?:\.([^.]+))?$/;
const format = function (uri) {
  const matched = data(uri)
  if ( matched ) {
    return matched.type
  } else {
    const [ f ] = uri.split(/[?#]/)
    return mime.lookup(f)
  }
}

const map = {
  'application/vnd.ms-fontobject': 'embedded-opentype'
, 'application/x-font-ttf': 'truetype'
, 'application/font-woff': 'woff'
, 'application/font-woff2': 'woff2'
, 'application/x-font-type1': 'afm'
, 'image/svg+xml': 'svg'
}

const fmt = function (format) {
  if ( format.slice(0, 4) === 'font' ) {
    return format.slice(5)
  } else if ( map[format] ){
    return map[format]
  } else {
    throw new Error(`Cannot find font format for type ${format}`)
  }
}

const order = [
  'embedded-opentype'
, 'woff'
, 'truetype'
, 'svg'
, 'afm'
]

const font = function(...uris) {
  const s =
    uris
      .map(uri => ({
        uri: uri.val
      , format: fmt(format(uri.val))
      }))

  const sorted = s.sort(function (a, b) {
    const i = order.indexOf(a.format) + 1 || Infinity
    const j = order.indexOf(b.format) + 1 || Infinity

    if ( i === j ) {
      const da = !data(a.uri)
      const db = !data(b.uri)
      return da - db
    } else {
      return (i - j) || 0
    }
  })

  const urls =
    sorted.map(el => `url(${JSON.stringify(el.uri)}) format(${el.format})`)

  return urls.join(', ');
}

const ok = function (style) {
  style.define('mksrc', font)
  style.import(path.resolve(__dirname, 'fn.styl'))
}

export default ok


