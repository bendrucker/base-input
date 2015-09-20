# base-input [![Build Status](https://travis-ci.org/bendrucker/base-input.svg?branch=master)](https://travis-ci.org/bendrucker/base-input)

> Base input field for virtual-dom


## Install

```
$ npm install --save base-input
```


## Usage

```js
var BaseInput = require('base-input')
var MyInput = BaseInput({
  parse: parse,
  format: format,
  validate: validate
})

var state = MyInput()
// form input is parsed, state changes are formatted

MyInput.validate(state)
```

## API

#### `BaseInput([input])` -> `function`

Create a new input.

##### input

*Required*  
Type: `object`

Includes optional `parse`, `format`, and `validate` functions. An `input.options` will be applied to the three provided functions as well as `Input.render` before extending with its options. You should pass options like `name` here and reserve purely presentational attributes like `style` for your `render` calls.

#### `Input.render(state, [options])` -> `vtree`

Render the input.

##### state

*Required*  
Type: `function`

The observable input state.

##### options

Type: `object`  
Default: `{}`

Options to apply to the created [virtual hyperscript](https://github.com/matt-esch/virtual-dom) node.

#### `Input.validate(state)` -> `boolean`

##### state

*Required*  
Type: `function`

The observable input state.

#### `Input.onInput(state, listener)` -> `function`

Returns a function that disables the listener.

##### state

*Required*  
Type: `function`

The observable input state.

##### listener

*Required*  
Type: `function`

A function to call when the input changes.

## Related

* [email-input](https://github.com/bendrucker/email-input)
* [zip-input](https://github.com/bendrucker/zip-input)
* [phone-input](https://github.com/bendrucker/phone-input)

## License

MIT © [Ben Drucker](http://bendrucker.me)
