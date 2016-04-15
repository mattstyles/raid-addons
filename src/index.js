
import curry from './curry'
import compose from './compose'
import TickSignal from './tick'
import KeySignal from './keys'
import ClickSignal from './click'

var addons = {
  curry,
  compose,
  TickSignal,
  KeySignal,
  ClickSignal
}

export default addons
module.exports = addons
