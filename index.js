'use strict'

var extend = require('xtend')
var State = require('dover')
var Observ = require('observ')
var Event = require('weakmap-event')
var changeEvent = require('value-event/change')
var h = require('virtual-dom/h')
var value = require('observ-value')
var cuid = require('cuid')

module.exports = BaseInput

var defaults = {
  parse: identity,
  format: identity,
  validate: Boolean,
  options: {}
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
    state.value.set(input.parse(data[data.name], input.options))
    InputEvent.broadcast(state, {})
  }

  function render (state, options) {
    options = extend(input.options, options || {})

    if (!options.name) {
      options.name = 'input-' + cuid()
    }

    options = extend(options, {
      value: input.format(state.value, options),
      'ev-event': changeEvent(state.channels.change, {
        name: options.name
      })
    })

    return h('input', options)
  }

  function validate (state) {
    return input.validate(value(state.value), input.options)
  }
}

function identity (value) {
  return value
}
