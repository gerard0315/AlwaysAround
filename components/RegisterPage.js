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


