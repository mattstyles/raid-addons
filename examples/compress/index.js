
import {render} from 'inferno-dom'

import {Signal} from 'raid'
import compress from '../../src/compress'

import element from '../_common/element'

const signal = new Signal({
  name: 'Joe',
  age: 20
})

const dispatch = type => {
  return event => {
    signal.emit({type})
  }
}

const Person = ({name, age}) => {
  return (
    <div style={{padding: 30}}>
      <h2 onClick={dispatch('CHANGE_NAME')}>{name}</h2>
      <p onClick={dispatch('CHANGE_AGE')}>{`Age: ${age}`}</p>
    </div>
  )
}

const updateAge = state => {
  state.age++
  return state
}

const updateName = state => {
  state.name = state.name === 'Joe'
    ? 'Josie'
    : 'Joe'
  return state
}

signal.register(compress({
  'CHANGE_NAME': updateName,
  'CHANGE_AGE': updateAge
}))

signal.observe(state => {
  render(
    <Person name={state.name} age={state.age} />,
    element
  )
})
