'use strict'

var extend = require('xtend')
var State = require('dover')
var Observ = require('observ')
var watch = require('observ/watch')
var value = require('observ-value')
var Thunk = require('observ-thunk')
var pipe = require('value-pipe')
var Event = require('weakmap-event')

var h = require('virtual-dom/h')
var changeEvent = require('value-event/change')
var cuid = require('cuid')

module.exports = BaseInput

var defaults = {
  parse: identity,
  format: String,
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

    var state = State({
      value: Observ(data.value || null),
      raw: Observ(data.raw || ''),
      channels: {
        change: change
      }
    })

    InputEvent.listen(state, pipe(
      input.parse,
      state.value.set
    ))

    watch(state.value, Thunk(pipe(input.format, state.raw.set)))

    return state
  }

  function change (state, data) {
    state.raw.set(data[data.name])
    InputEvent.broadcast(state, state.raw())
  }

  function render (state, options) {
    options = extend(input.options, options || {})

    if (!options.name) {
      options.name = 'input-' + cuid()
    }

    options = extend(options, {
      value: state.raw,
      'ev-event': changeEvent(state.channels.change, {
        name: options.name
      })
    })

    return h('input', options)
  }

  function validate (state) {
    return input.validate(value(state.value))
  }
}

function identity (value) {
  return value
}
