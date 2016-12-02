
const compress = updates => {
  return (state, event) => {
    let update = updates[event.type]
    if (update) {
      return update(state, event.payload)
    }
    return state
  }
}

export default compress
