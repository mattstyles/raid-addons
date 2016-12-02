
function fold (updates, state, event) {
  return Promise
    .all(updates.map(update => update(state, event)))
}

function async () {
  let key = Math.random().toString(16).slice(4)
  let updates = Array.from(arguments).slice(1, arguments.length)
  let emit = arguments[0]

  return (state, event) => {
    if (event.type === key) {
      return event.payload
    }

    Promise
      .resolve(fold(updates, state, event))
      .then(res => {
        let collected = res
          .reduce(newState => {
            return Object.assign(state, newState)
          }, state)

        emit({
          type: key,
          payload: collected
        })
      })

    return state
  }
}

export default async
