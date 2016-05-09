'use strict';


var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import {Actions, Scene, Router} from 'react-native-router-flux';

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  Easing
} = React;


var RegisterPage = React.createClass({
  getInitialState: function() {
      return {
        username: '',
        password: '',
        needToRegister: true,
        //hidden: false,
        loginHide: false,
        registerHide: true,

        source: require('../ios/z.png'),

        userNameSlideUpPosition: new Animated.Value(400),
        passwordSlideUpPosition: new Animated.Value(500),
        fbLoginSlideUpPosition: new Animated.Value(600),
        forgetPasswordSlideUpPosition: new Animated.Value(700),
        firstVist: true,

        userNameFadeIn: new Animated.Value(0),
        passwordFadeIn: new Animated.Value(0),
        fbLoginFadeIn: new Animated.Value(0),
        forgetPasswordFadeIn: new Animated.Value(0)

      }
  },
  
	render() {
			console.log('MainPage');
			return <React.Text style={styles.text}>MainPage</React.Text>;
	}


});

var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
});


module.exports = RegisterPage;


