'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reduxImmutable = require('redux-immutable');

var _reactRedux = require('react-redux');

var _dogReducer = require('./reducers/dog-reducer');

var _dogReducer2 = _interopRequireDefault(_dogReducer);

var _barkMessage = require('./containers/bark-message');

var _barkMessage2 = _interopRequireDefault(_barkMessage);

var _barkButton = require('./containers/bark-button');

var _barkButton2 = _interopRequireDefault(_barkButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)((0, _reduxImmutable.combineReducers)({
  dog: _dogReducer2.default
}));

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_barkMessage2.default, null),
    _react2.default.createElement(_barkButton2.default, null)
  )
), document.querySelector('.app'));