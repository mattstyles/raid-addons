
import curry from './curry'
import compose from './compose'
import TickSignal from './tick'
import KeySignal from './keys'
import ClickSignal from './click'
import WindowSignal from './window'

var addons = {
  curry,
  compose,
  TickSignal,
  KeySignal,
  ClickSignal,
  WindowSignal
}

export default addons
module.exports = addons
