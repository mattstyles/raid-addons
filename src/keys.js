
import Quay from 'quay'
import { Signal } from 'raid'

/**
 * Key emitter is a global keypress handler.
 * Emits regular events from keypresses passing back a map
 * of the currently pressed keys.
 *
 * @example
 * const keys = KeySignal({
 *   model: app
 * })
 * keys.register( src => {
 *   src.subscribe( event => {
 *     console.log( event.keys.has( '<up>' ) )
 *   })
 * })
 *
 */

// Single quay instance to pull from
const quay = new Quay()

export default function KeySignal( opts ) {
  const signal = new Signal( opts )

  quay.on( '*', event => signal.dispatch({
    keys: quay.pressed,
    duration: event.delta
  }))

  return signal
}
