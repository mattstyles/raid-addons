
import stream from 'raf-stream'
import { Signal } from 'raid'

/**
 * Emits regular events when the mouse button is depressed or a touch
 * is registered
 *
 * @example
 * const click = TickSignal({
 *   model: app
 * })
 * click.register( src => {
 *   src.subscribe( event => {
 *     console.log( event.delta, event.model )
 *   })
 * })
 *
 */
export default function ClickSignal( opts={} ) {
  const click = new Signal( opts )

  let duration = 0
  const raf = stream()
    .on( 'data', dt => {
      duration += duration === 0
        ? 1
        : dt
      return click.dispatch({
        duration: duration
      })
    })

  raf.pause()

  function onDown() {
    duration = 0
    raf.resume()
  }

  function onUp() {
    raf.pause()
  }

  window.addEventListener( 'mousedown', onDown )
  window.addEventListener( 'mouseup', onUp )

  // Touch handlers are applied by default
  if ( opts.touch || typeof opts.touch === 'undefined' ) {
    window.addEventListener( 'touchdown', onDown )
    window.addEventListener( 'touchup', onUp )
  }

  window.addEventListener( 'focus', event => raf.resume() )
  window.addEventListener( 'blur', event => raf.pause() )

  return click
}
