
import { Signal } from 'raid'
import { Observable } from 'rx-lite'

/**
 * Handles some window change events.
 *
 * @example
 * const win = WindowSignal({
 *   model: app
 * })
 * win.register( src => {
 *   src.subscribe( event => {
 *     if ( event.type === 'resize' ) {
 *       console.log( event.width, event.height )
 *     }
 *     if ( event.type === 'scroll' ) {
 *       console.log( event.position )
 *     }
 *     if ( event.type === 'orientation' ) {
 *       console.log( event.angle, event.orientation )
 *     }
 *   })
 * })
 *
 */
export default function WindowSignal( opts ) {
  const signal = new Signal( opts )

  const scroll = Observable.fromEvent( document, 'scroll' )
    .map( event => {
      return {
        type: 'scroll',
        position: typeof document.body.scrollTop !== 'undefined' ? document.body.scrollTop : null,
        timestamp: event.timeStamp || null
      }
    })

  const resize = Observable.fromEvent( window, 'resize' )
    .debounce( 100 )
    .map( event => {
      return {
        type: 'resize',
        width: event.target.innerWidth,
        height: event.target.innerHeight,
        timestamp: event.timeStamp || null
      }
    })

  const orientation = Observable.fromEvent( window, 'orientationchange' )
    .map( event => {
      return {
        type: 'orientation',
        angle: screen.orientation.angle,
        orientation: screen.orientation.type
      }
    })

  const source = Observable.merge([
    scroll,
    resize,
    orientation
  ])

  source.subscribe( signal.dispatch )

  return signal
}
