'use strict';

import React from 'react';
import {AppRegistry, Navigator, StyleSheet,Text,View} from 'react-native';
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import AlwaysAroundApp from './AlwaysAround.js';
//import LoginPage from './components/LoginPage.js';
//import LoginPage from './components/Login.js'
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
import PromotionsPage from './components/Promotions.js';
import SettingsPage from './components/Settings.js';
import EditAccount from './components/editAccount.js';
import CameraView from './components/Camera.js';
//import CameraRollPage from './components/CameraRollPageView.js';
//import ImageCropping from './components/ImageCrop.js';
import EditDog from './components/editDogPage.js';
import ConfirmationPage from './components/confirmPage.js';
import SelectPaymentPage from './components/chosePayment.js';
import InServicePage from './components/InService.js';
import verifyPage from './components/verifyPage.js'

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

class AlwaysAround extends React.Component{

	render() {
        return <Router createReducer={reducerCreate}>
            <Scene key="modal" component={Modal} >
                <Scene key="root" hideNavBar={true}>
	                <Scene key="choose" component={AlwaysAroundApp} initial={true}/>
                    <scene key="verify" component={verifyPage} panHandlers={null} />
	                <Scene key="home" component={MainPage} panHandlers={null} />
                    <Scene key="myDogs" component={MyDogs} panHandlers={null} />
                    <Scene key="dogDetails" component={DogDetails} panHandlers = {null}/>
                    <Scene key="search" component = {SearchPage} panHandlers ={null}/>
                    <Scene key="history" component = {HistoryPage} panHandlers = {null}/>
                    <Scene key="detailHistory" component = {DetailedHistory} panHandlers = {null}/>
                    <Scene key="paymentPage" component = {PaymentPage} panHandlers={null}/>
                    <Scene key="addPayment" component = {AddPaymentPage} panHandlers = {null}/>
                    <Scene key="editPayment" component = {EditPaymentPage} panHandlers = {null}/>
                    <Scene key="promotions" component = {PromotionsPage} panHandlers = {null}/>
                    <Scene key="settings" component = {SettingsPage} panHandlers = {null}/>
                    <Scene key="editAccount" component = {EditAccount} panHandlers = {null}/>
                    <Scene key="camera" component = {CameraView} panHandlers = {null}/>
                    {/*<Scene key='cameraRoll' component = {CameraRollPage} panHandlers = {null}/>*/}
                    {/*<Scene key='crop' component = {ImageCropping} panHandlers = {null}/>*/}
                    <Scene key='editDogs' component = {EditDog} panHandlers = {null}/>
                    <Scene key='confirm' component = {ConfirmationPage} panHandlers ={null}/>
                    <Scene key='selectPayment' component = {SelectPaymentPage} panHandlers ={null}/>
                    <Scene key='inService' component = {InServicePage} panHandlers = {null}/>
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
