import stylus from 'stylus'

const weights = [
  'normal'
, 'bold'
, 'bolder'
, 'lighter'
, 100
, 200
, 300
, 400
, 500
, 600
, 700
, 800
, 900
]

const styles = [
  'normal'
, 'italic'
, 'oblique'
]

const rep = function (def) {
  if ( def instanceof stylus.nodes.String ) {
    return def.val
  } else if ( def instanceof stylus.nodes.Expression ) {
    return rep(def.nodes[0])
  } else if ( def instanceof stylus.nodes.Ident ) {
    return rep(def.name)
  } else if ( typeof def === 'string' || typeof def === 'number' ) {
    return def
  }
}


const find = function (def, arr) {
  const val = rep(def)
  if ( arr.indexOf(val) >= 0 ) {
    return val
  } else {
    return false
  }
}

export default function (args) {

  const [ fst, snd, ...rest] = args

  const fw = find(fst, weights)

  if ( fw ) {
    // first one is a weight
    const ss = find(snd, styles)
    if ( ss ) {
      return {
        weight: fw
      , style:  ss
      , rest
      }
    } else {
      return {
        weight: fw
      , style:  'normal'
      , rest: [ snd, ...rest ]
      }
    }
  } else {
    // first one is not a weight
    const fs = find(fst, styles)
    if ( fs ) {
      const sw = find(snd, weights)
      if ( sw ) {
        return {
          weight: sw
        , style:  fs
        , rest
        }
      } else {
        return {
          weight: 'normal'
        , style:  fs
        , rest:   [ snd, ...rest ]
        }
      }
    } else {
      // first one is also not a style
      return {
        weight: 'normal'
      , style:  'normal'
      , rest:   [ fst, snd, ...rest ]
      }
    }
  }
}
