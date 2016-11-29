
import {render} from 'inferno-dom'
import {Signal} from 'raid'

import adaptor from '../../src/adaptor'

import element from '../_common/element'

let signal = new Signal({
  foo: 'bar'
})

let store = adaptor(signal)

const Comp = ({foo}) => {
  return <h1>{foo}</h1>
}
const App = store.connect('foo', Comp)

store.observe(state => {
  render(<App />, element)
})
