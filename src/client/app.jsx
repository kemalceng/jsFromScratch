import 'babel-polyfill'

import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import Dog from '../shared/dog'

// const browserToby = new Dog('Browser Toby')

// document.querySelector('.app').innerText = browserToby.bark()

const dogBark = new Dog('Browser Toby').bark()

const App = props => (
  <div>
    The dog says:
    {props.message}
  </div>
)

App.propTypes = {
  message: PropTypes.string.isRequired
}

ReactDOM.render(<App message={dogBark} />, document.querySelector('.app'))
