'use strict'

var test = require('tape')
var thermometer = require('thermometer')
var raf = require('raf')
var dispatchEvent = require('dispatch-event')
var BaseInput = require('./')

var CapitalInput = BaseInput({
  parse: lowercase,
  format: capitalize,
  validate: validate,
  options: {
    name: 'capital'
  }
})

var render = thermometer.createComponent(CapitalInput)

test('state to dom', function (t) {
  t.plan(1)
  render(function (state, element, done) {
    state.value.set('bvd')
    raf(function () {
      t.equal(element.value, 'BVD')
      done()
    })
  })
})

test('dom to state', function (t) {
  t.plan(3)
  render(function (state, element, done) {
    CapitalInput.onInput(state, function (data) {
      t.pass('onInput')
    })

    element.value = 'BVD'
    dispatchEvent(element, 'input')

    raf(function () {
      t.equal(state.value(), 'bvd')
      t.ok(CapitalInput.validate(state))
      done()
    })
  })
})

function lowercase (value) {
  return value.toLowerCase()
}

function capitalize (value) {
  return value ? value.toUpperCase() : ''
}

function validate (value) {
  return lowercase(value) === value
}
