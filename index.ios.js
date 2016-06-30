'use strict';

var React = require('react-native');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import AlwaysAroundApp from './AlwaysAround.js';
//import LoginPage from './components/LoginPage.js';
import LoginPage from './components/Login.js'
import MainPage from './components/MainPage.js';
//import AddDog from './components/newDogPage.js';
import MyDogs from './components/dogsPage.js';
import DogDetails from './components/dogDetails.js';
import SearchPage from './components/SearchPage.js';
import HistoryPage from './components/history.js';
import DetailedHistory from './components/detailedHistory.js';
import PaymentPage from './components/payment.js';
import AddPaymentPage from './components/addPaymentPage.js';
import EditPaymentPage from './components/editPayment.js';
//import RegisterPage from './components/RegisterPage.js'


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
	                <Scene key="home" component={MainPage} panHandlers={null} />
                    <Scene key="myDogs" component={MyDogs} panHandlers={null} />
                    <Scene key="dogDetails" component={DogDetails} panHandlers = {null}/>
                    <Scene key="search" component = {SearchPage} panHandlers ={null}/>
                    <Scene key="history" component = {HistoryPage} panHandlers = {null}/>
                    <Scene key="detailHistory" component = {DetailedHistory} panHandlers = {null}/>
                    <Scene key="paymentPage" component = {PaymentPage} panHandlers={null}/>
                    <Scene key="addPayment" component = {AddPaymentPage} panHandlers = {null}/>
                    <Scene key="editPayment" component = {EditPaymentPage} panHandlers = {null}/>
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
