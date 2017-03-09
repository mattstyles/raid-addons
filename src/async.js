
function fold (updates, state, event) {
  // console.log(updates)
  // console.log(updates[0])
  // return Promise
    // .all(updates.map(update => update(state, event)))
  return new Promise((resolve, reject) => {

  })
}

// function arc () {
//   let key = Math.random().toString(16).slice(4)
//   let updates = Array.from(arguments).slice(1, arguments.length)
//   let emit = arguments[0]
//
//   return (state, event) => {
//     if (event.type === key) {
//       return event.payload
//     }
//
//     Promise
//       .resolve(fold(updates, state, event))
//       .then(res => {
//         // let collected = res
//         //   .reduce(newState => {
//         //     return Object.assign(state, newState)
//         //   }, state)
//         //
//         // emit({
//         //   type: key,
//         //   payload: collected
//         // })
//       })
//
//     return state
//   }
// }
const arc = (emit, updates) => {
  return (state, event) => {
    // Promise.resolve(fold([updates], state, event))
    Promise.resolve(updates(state, event))
    return state
  }
}

export default arc
