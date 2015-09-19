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

#### `BaseInput([options])` -> `function`

Create a new input.

##### options

*Required*  
Type: `object`

Includes optional `parse`, `format`, and `validate` functions.

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

## Related

* [email-input](https://github.com/bendrucker/email-input)
* [zip-input](https://github.com/bendrucker/zip-input)
* [phone-input](https://github.com/bendrucker/phone-input)

## License

MIT © [Ben Drucker](http://bendrucker.me)
