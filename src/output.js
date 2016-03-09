
export default function (def) {
  if ( def.local ) {
    return `local("${def.uri}")`
  } else {
    return `url(${def.uri}) format(${def.format})`
  }
}
