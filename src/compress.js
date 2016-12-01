
const compress = updates => {
  return (state, event) => {
    if (updates[event.type]) {
      return updates[event.type](state)
    }
    return state
  }
}

export default compress
