function skip(elementSize) {
  return this.filter((item, index) => {
    if(index >= elementSize){
      return true
    }
  })
}

function limit(elementSize){
  return this.filter((item, index) => {
    if(index < elementSize){
      return true
    }
  })
}

Array.prototype.limit = limit
Array.prototype.skip = skip