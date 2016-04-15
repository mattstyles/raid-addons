
import raf from 'raf-stream'
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
export default function TickSignal( opts ) {
  const tick = new Signal( opts )

  raf().on( 'data', dt => tick.dispatch({
    delta: dt
  }))

  return tick
}
