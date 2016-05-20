'use strict';

var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import AlwaysAroundApp from './AlwaysAround.js';
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

class AlwaysAround extends React.Component{

	render() {
        console.log('this is index');
        return <Router createReducer={reducerCreate}>
            <Scene key="modal" component={Modal} >
                <Scene key="root" hideNavBar={true}>
	                <Scene key="choose" component={AlwaysAroundApp} initial={true}/>
	                <Scene key="home" component={MainPage}/>
	            </Scene>
            </Scene>
        </Router>;
    }

}

AppRegistry.registerComponent('AlwaysAround', () => AlwaysAround);


//AlwasyAround --- loginNotFound ----- LoginPage -------- Register
//     |                                  |
//loginFound -- MainPage ---------------loggedIn
//                |
//              drawerOptions
