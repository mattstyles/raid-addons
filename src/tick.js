
import stream from 'raf-stream'
import { Signal } from 'raid'

/**
 * Exposes a signal tied to requestAnimationFrame
 *
 * @example
 * const tick = TickSignal({
 *   model: app
 * })
 * tick.register( src => {
 *   src.subscribe( event => {
 *     console.log( event.delta, event.model )
 *   })
 * })
 *
 */

// Just create the one instance of raf
let raf = stream()

export default function TickSignal( opts ) {
  const tick = new Signal( opts )

  raf.on( 'data', dt => tick.dispatch({
    delta: dt
  }))

  return tick
}
