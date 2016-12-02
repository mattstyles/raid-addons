
import 'babel-polyfill'
import {render} from 'inferno-dom'
import {Signal} from 'raid'

import async from '../../src/async'

import element from '../_common/element'
import Button from '../_common/actionButton'

const signal = new Signal({
  name: 'Joe',
  age: 20,
  requesting: false
})

const dispatch = type => {
  return payload => {
    signal.emit({type, payload})
  }
}

const Person = ({name, age, requesting}) => {
  return (
    <div style={{margin: 30, background: 'white', borderRadius: 3, padding: 12, display: 'table'}}>
      <h2 style={{margin: 6}}>{name}</h2>
      <Button
        styles={{
          marginRight: 0,
          marginTop: 8,
          background: requesting ? 'rgb(144, 194, 144)' : 'rgb(104, 139, 88)',
          width: 180
        }}
        onClick={dispatch('CHANGE')}
      >
        {requesting ? 'Updating...' : 'Trigger Update'}
      </Button>
    </div>
  )
}

const delay = ms => {
  return {
    then: cb => setTimeout(cb, ms)
  }
}

const update = async (state, event) => {
  if (event.type === 'CHANGE') {
    await delay(1000)
    state.name = state.name === 'Joe'
      ? 'Josie'
      : 'Joe'
    signal.emit({type: 'COMPLETE'})
    return state
  }
  return state
}

const request = (state, event) => {
  if (event.type === 'CHANGE') {
    state.requesting = true
    return state
  }

  if (event.type === 'COMPLETE') {
    state.requesting = false
    return state
  }

  return state
}

signal.register(async(signal.emit, update))
signal.register(request)

signal.observe(state => {
  render(
    <Person name={state.name} age={state.age} requesting={state.requesting} />,
    element
  )
}, e => console.error(e))
