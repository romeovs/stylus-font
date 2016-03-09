
// get the data from  a data uri
// returns false if uri is not data
export default function (uri) {
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

