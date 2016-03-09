import stylus from 'stylus'
import mime   from 'mime'

import data   from './data'
import format from './mime-to-fmt'

const type = function (uri) {
  const matched = data(uri)
  if ( matched ) {
    return {
      format: format(matched.type)
    , data: true
    }
  } else {
    const [ f ] = uri.split(/[?#]/)
    return {
      format: format(mime.lookup(f))
    , data: false
    }
  }
}

// get info from args
const extract = function (arg, dotype = true) {
  if ( arg instanceof stylus.nodes.Call ) {
    switch ( arg.name ) {
      case 'url':
        return extract(arg.args.nodes[0], dotype)
      case 'local':
        return {
          ...extract(arg.args.nodes[0], false)
        , local: true
        , data:  false
        }
      default:
        throw new Error('font: args can only be strings, url(...) or local(...)')
    }
  } else if ( arg instanceof stylus.nodes.Expression ) {
    return extract(arg.nodes[0], dotype)
  } else if ( arg instanceof stylus.nodes.Ident ) {
    return extract(arg.string, dotype)
  } else if ( arg instanceof stylus.nodes.String ) {
    return extract(arg.val, dotype)
  } else if ( typeof arg === 'string' ) {
    return {
      uri: arg
    , local: false
    , ...(dotype ? type(arg) : {})
    }
  } else {
    console.log('Huuh', arg)
    throw new Error(`font - failure to parse argument: ${arg}`)
  }
}

export default extract
