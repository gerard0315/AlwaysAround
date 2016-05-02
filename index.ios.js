'use strict';

var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
import AlwaysAround from './AlwaysAround.js';

var {
  AppRegistry
} = React;

AppRegistry.registerComponent('AlwaysAround', () => AlwaysAround);


//AlwasyAround --- loginNotFound ----- LoginPage -------- Register
//     |                                  |
//loginFound -- MainPage ---------------loggedIn
//                |
//              drawerOptions
