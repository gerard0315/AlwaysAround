'use strict';

import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'

import LoginPage from './components/Login.js'
import MainPage from './components/MainPage.js'


var AlwaysAroundApp = React.createClass({

    getInitialState: function() {
    	return { 
    		currentRoute: 'LOGIN_NOT_FOUND',
    	};
  	},

	renderScene(route, navigator) {
	    if (route && route.component) {
	      let Component = route.component;
	      return (
	        <Component navigator={navigator} route={route} />
	      )
	    }

	    switch (this.state.currentRoute) {
	      case 'LOGIN_NOT_FOUND':
	        return <LoginPage navigator={navigator} />
	      case 'LOGIN_FOUND':
	        return <MainPage navigator={navigator} />
	      default:
	        return <View />
	    }
	  },

	render() {
	console.log('rendering');
    return (
	      <Navigator
	        initialRoute={ { route: this.state.currentRoute } }
	        renderScene={this.renderScene}
	        configureScene={(route) => {
	          if (route.sceneConfig) {
	            return route.sceneConfig;
	          }
	          return Navigator.SceneConfigs.FloatFromRight;
	        	}}
	      />
    	);
  	},

});

module.exports = AlwaysAroundApp;