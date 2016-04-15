
/**
 * Composed a list of functions, and can be used to pass a model
 * along a functional composition chain. Goes hand-in-hand with
 * a list of curried functions.
 * Returns the resultant model after passing through each function.
 *
 * @example
 *   let update = compose(
 *     curry( physics )( event.delta ),
 *     curry( gravity )( event.delta )
 *   )
 *   event.model.merge( update( event.model.toJS() ) )
 */
export default function compose() {
  let fns = Array.from( arguments )
  return function exec( model ) {
    return fns.reduce( ( m, fn ) => {
      return fn( m )
    }, model )
  }
}
