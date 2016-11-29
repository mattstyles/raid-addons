
import {render} from 'inferno-dom'
import {Signal} from 'raid'
import {createSelector} from 'reselect'

import adaptor from '../../src/adaptor'

import element from '../_common/element'

let signal = new Signal({
  name: 'Raid'
})

let store = adaptor(signal)

const Message = ({msg, id}) => {
  return (
    <div>
      <h1>{msg + ' ' + id}</h1>
    </div>
  )
}

const selector = createSelector(
  state => state.name,
  name => ({id: name})
)
const App = store.connect(selector, Message)

store.observe(state => {
  render(<App msg='Hello' />, element)
})
