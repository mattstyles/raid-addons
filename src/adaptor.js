
const adaptor = signal => {
  let internalState = {}
  signal.observe(state => {
    internalState = state
  })
  return {
    connect (selector, Component) {
      return props => {
        let state = selector(internalState)
        return <Component {...state} {...props} />
      }
    },
    observe (onAction, onError, onComplete) {
      return signal.observe(onAction, onError, onComplete)
    }
  }
}

export default adaptor
