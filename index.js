'use strict'

var extend = require('xtend')
var State = require('dover')
var Observ = require('observ')
var Event = require('weakmap-event')
var changeEvent = require('value-event/change')
var h = require('virtual-dom/h')
var value = require('observ-value')
var pipe = require('value-pipe')

module.exports = BaseInput

var defaults = {
  parse: identity,
  format: identity,
  validate: Boolean
}

function BaseInput (input) {
  input = extend(defaults, input || {})

  Input.render = render
  Input.validate = validate

  var InputEvent = Event()
  Input.onInput = InputEvent.listen

  return Input

  function Input (data) {
    data = data || {}

    return State({
      value: Observ(data.value || ''),
      channels: {
        change: change
      }
    })
  }

  function change (state, data) {
    pipe(input.parse, state.value.set)(data[data.name])
    InputEvent.broadcast(state, {})
  }

  function render (state, options) {
    options = extend(options || {}, {
      value: input.format(state.value),
      'ev-event': changeEvent(state.channels.change, {
        name: options.name
      })
    })

    return h('input', options)
  }

  function validate (state) {
    return pipe(value, input.validate)(state.value)
  }
}

function identity (value) {
  return value
}
