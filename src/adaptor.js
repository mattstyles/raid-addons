
const adaptor = signal => {
  let internalState = {}
  signal.observe(state => {
    internalState = state
  })
  return {
    connect (selector, Component) {
      return props => {
        let state = internalState[selector]
        return <Component foo={state} />
      }
    },
    observe (onAction, onError, onComplete) {
      return signal.observe(onAction, onError, onComplete)
    }
  }
}

export default adaptor
