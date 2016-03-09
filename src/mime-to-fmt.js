
const mimes = {
  'application/vnd.ms-fontobject': 'embedded-opentype'
, 'font/embedded-opentype': 'embedded-opentype'
, 'font/truetype': 'truetype'
, 'application/x-font-ttf': 'truetype'
, 'application/font-woff': 'woff'
, 'application/x-font-otf': 'opentype'
, 'font/opentype': 'opentype'
, 'font/woff': 'woff'
, 'application/font-woff2': 'woff2'
, 'font/woff2': 'woff2'
, 'application/x-font-type1': 'afm'
, 'image/svg+xml': 'svg'
}

// convert format to font-face compatible format
export default function (format) {
  if ( mimes[format] ){
    return mimes[format]
  } else if ( format.slice(0, 4) === 'font' ) {
    return format.slice(5)
  } else {
    throw new Error(`Cannot find font format for type ${format}`)
  }
}

