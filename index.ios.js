'use strict';

var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import AlwaysAround from './AlwaysAround.js';
import LoginPage from './components/LoginPage.js'
import MainPage from './components/MainPage.js'
import RegisterPage from './components/RegisterPage.js'


var {
  AppRegistry
} = React;

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

const scenes = Actions.create(
            <Scene key="root">
                <Scene key="login" component={LoginPage}/>
                <Scene key="register" component={RegisterPage}/>
                <Scene key="home" component={MainPage}/>
            </Scene>
	);

class App extends React.Component{

	render() {
        return <Router scenes={scenes}/>
    }

}

AppRegistry.registerComponent('AlwaysAround', () => AlwaysAround);


//AlwasyAround --- loginNotFound ----- LoginPage -------- Register
//     |                                  |
//loginFound -- MainPage ---------------loggedIn
//                |
//              drawerOptions
