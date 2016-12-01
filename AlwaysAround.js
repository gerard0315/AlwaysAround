'use strict';
import React, {Component, propTypes} from 'react';
import {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import LoginPage from './components/Login.js';
import MainPage from './components/MainPage.js';
import pageVerify from './components/verifyPage.js';

var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: {
  }
});

global.storage = storage;

var AlwaysAroundApp = React.createClass({

    getInitialState: function() {
		return { 
				currentRoute: "",
				render: false,
				firstName: "",
				token: "",
				lastName: "",
				pets: []
	    	};
  	},

  	componentDidMount:function(){
		storage.load({
				key: 'loginState',
				autoSync: true,
    			syncInBackground: true,
			}).then(ret => {
				console.log(ret);
				//console.log(ret.token);
				//console.log(ret.first_name);
				this.setState({firstName: ret.first_name});
				this.setState({token: ret.token});
				this.setState({lastName: ret.last_name});
				this.setState({pets: ret.pets})
				this.setState({currentRoute: "LOGIN_FOUND"});

				this.setState({render: true});
			}).catch(err => {
				console.log("error caught")
				console.warn("this is error message: " + err.message);
				this.setState({currentRoute: "LOGIN_NOT_FOUND"});
				this.setState({render: true});
			}).done();
  	},

	renderScene(route, navigator) {
	    if (route && route.component) {
	    	console.log("IN IFFFFFFFFF")
	      let Component = route.component;
	      return (
	        <Component navigator={navigator} route={route} />
	      )
	    }

	    switch (this.state.currentRoute) {
	      case 'LOGIN_NOT_FOUND':
	        return <LoginPage navigator={navigator} />
	      case 'LOGIN_FOUND':
	        return <MainPage navigator={navigator} data = {{
	        	token: this.state.token,
	        	firstName: this.state.firstName,
	        	lastName: this.state.lastName,
	        	pets: this.state.pets,
	        }}/>
	      default:
	        return (<View style = {{backgroundColor: "#EA4D4E"}}/>)
	    }
	 },

	render() {
		//console.log(this.state.route);
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
			)
		}

});

module.exports = AlwaysAroundApp;