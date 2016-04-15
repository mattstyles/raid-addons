
import Quay from 'quay'
import { Signal } from 'raid'

/**
 * Key emitter is a global keypress handler
 * Emits regular events from keypresses passing back a map
 * of the currently pressed keys
 */
export default function KeySignal( opts ) {
  const quay = new Quay()
  const signal = new Signal( opts )

  quay.on( '*', event => signal.dispatch({
    keys: quay.pressed
  }))

  return signal
}
