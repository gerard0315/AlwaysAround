'use strict';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
//import RegisterPage from './RegisterPage.js'
var TimerMixin = require('react-timer-mixin');

import React, {
  Component,
  StyleSheet,
  MapView,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  Navigator,
  ListView,
  Easing,
} from 'react-native';

exports.framework = 'React';




var MainPage = React.createClass({
  watchID: (null: ?number),
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      latitude: 0,
      longitude: 0,
      initialPosition: 'unknown',
      lastPosition: 'unknown',

    };
  },

  componentDidMount: function() {
    this.setTimeout(
      () => {        
          navigator.geolocation.getCurrentPosition(
            (position) => {
              var initialPosition = JSON.stringify(position);
              this.setState({initialPosition});
              console.log(initialPosition);
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
          this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
            var longitude = parseFloat(position.coords.longitude);
            var latitude = parseFloat(position.coords.latitude);
            this.setState({longitude});
            this.setState({latitude});
            console.log("longitude:", this.state.longitude);
            console.log("latitude:", this.state.latitude);
          });
      },
      1000
    );

  },

  componentWillUnmount: function() {

    navigator.geolocation.clearWatch(this.watchID);
  },

  openDrawer: function(){
    this._drawer.open();
    console.log('openDrawer');
  },

  closeDrawer: function(){
    this._drawer.close();
    console.log('closeDrawer');
  },

  openMyDogs: function(){
    Actions.addDog();
  },

	render() {
		return( 
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        captureGestures={true}
        content={
          <View style = {styles.menuContainer}>
            <TouchableOpacity onPress = {this.closeDrawer}>
              <Image style = {styles.buttonClose} 
                source={require('../ios/ban.png')}
                />
            </TouchableOpacity>
            <View style = {styles.avatarContainer}>
              <Image style = {styles.avatar}
                source = {{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                />
            </View>
            <Animated.View style = {styles.buttonPayment}>
              <TouchableOpacity>
                <Text style = {styles.menuItem}>PAYMENT</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {styles.buttonBookings}>
              <TouchableOpacity>
                <Text style = {styles.menuItem}>BOOKINGS</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {styles.buttonMyDogs}>
              <TouchableOpacity onPress = {this.openMyDogs}>
                <Text style = {styles.menuItem}>MYDOGS</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {styles.buttonContacts}>
              <TouchableOpacity>
                <Text style = {styles.menuItem}>CONTACTS</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {styles.buttonInvites}>
              <TouchableOpacity>
                <Text style = {styles.menuItem}>INVITES</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {styles.buttonAccounts}>
              <TouchableOpacity>
                <Text style = {styles.menuItem}>ACCOUNT</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {styles.buttonHelp}>
              <TouchableOpacity>
                <Text style = {styles.menuItem}>HELP</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>}
        captureGestures = {true}
        panOpenMask = {20}
        openDrawerOffset={0.4} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        negotiatePan={false}
        style = {styles.drawerStyles}
        acceptTap = {true}
        tapToClose={true}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
      <View style = {styles.container}>
        <View style = {styles.TopBarContainer}>
          <TouchableOpacity style={styles.toolbarButton}
                onPress={this.openDrawer}>
                <Text style={styles.toolbarButtonText}>{"MENU"}</Text>
          </TouchableOpacity>
          </View>
        <MapView
            style={styles.map}
            showsUserLocation={true}
            followUserLocation={true}
          />
      </View>
    </Drawer>
	)}
	
});


var styles = React.StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  TopBarContainer:{
    position: 'absolute',
    backgroundColor: '#E15668',
    top: 0,
    left: 0,
    right: 0,
    bottom: 580,
    flexDirection:'row'
  },

  map: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
  },

  toolbarButton:{
    
    paddingTop:35,
    paddingLeft: 7,
    width: 50,
    alignItems:'center'
  },
  toolbarButtonText:{
    paddingTop: 5,
    color:'#fff',
    fontWeight: 'normal',
    fontSize: 13,   
  },

  drawerStyles:{
    shadowColor: '#000000', 
    shadowOpacity: 0.5, 
    shadowRadius: 3
  },

  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 10,
    margin: 80
  },

  menuContainer:{
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#E15668',
  },

  avatarContainer:{
    backgroundColor: 'white',
    alignItems: 'center',    
  },

  avatar:{
    position: 'absolute',
    left: 60,
    top: 50,
    right: 50,
    width: 100,
    height: 100,
    borderRadius: 100/2,
  },

  buttonPayment:{
    marginTop: 200,
    marginLeft: 70,
  },

  buttonBookings:{
    marginTop: 10,
    marginLeft: 70,
  },

  buttonMyDogs:{
    marginTop: 10,
    marginLeft: 70,
  },

  buttonContacts:{
    marginTop: 10,
    marginLeft: 70,
  },

  buttonInvites:{
    marginTop: 10,
    marginLeft: 70,
  },

  buttonHelp:{
    marginTop: 10,
    marginLeft: 70,
  },

  buttonAccounts:{
    marginTop: 10,
    marginLeft: 70,
  },

  menuItem:{
    color: 'white',
    //backgroundColor: 'white',
    fontSize: 20,

  },

  buttonClose:{
    marginTop: 20,
    marginLeft: 15,
    height: 20,
    width: 20,
  },

});

module.exports = MainPage;