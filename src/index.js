import path   from 'path'
import stylus from 'stylus'

const map    = Array.prototype.map
const sort   = Array.prototype.sort
const filter = Array.prototype.filter

import byFormat from './by-format'
import extract  from './extract'
import output   from './output'
import config   from './config'


const font = function(...args) {
  const { weight, style, rest } = config(args)

  const sorted = rest
    ::Array.prototype.map(el => extract(el, true))
    ::sort(byFormat)

  const src = sorted
    ::map(output)
    .join(', ')

  const nolocal = sorted
    ::filter(el => !el.local)
    ::map(output)
    .join(', ')

  const fst = sorted.find(el => el.format === 'embedded-opentype' || !el.local && !el.data)

  return stylus.utils.coerceObject({
    src
  , weight
  , style
  , first: `url("${fst.uri}")`
  , nolocal
  }, true)
}



const module = function (style) {
  style.define('mksrc', font)
  style.import(path.resolve(__dirname, 'fn.styl'))
}

export default module

