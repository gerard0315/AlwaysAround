'use strict';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
var TimerMixin = require('react-timer-mixin');
var MapV = require('react-native-maps');
var Popover = require('react-native-popover');

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


var PickUpPoint = React.createClass({

  render(){
    return(
    <View>
      <Image style = {{
        width: 50,
        height: 50}}
        source ={require('../ios/MapMarker.png')}/>
    </View>
  )}

});


var MainPage = React.createClass({
  watchID: (null: ?number),
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      latitude: 0,
      longitude: 0,
      dogNumber: 0,
      timeEstimation: 0,
      dogNumberSelected: false,
      estimateTimeSelected: false,
      mapRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 2,
        longitudeDelta: 2,
      },
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      isVisible: false,
      buttonRect: {},
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
            {enableHighAccuracy: true, timeout: 200000, maximumAge: 2000000}
          );
          this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
            var longitude = parseFloat(position.coords.longitude);
            var latitude = parseFloat(position.coords.latitude);
            this.setState({longitude});
            this.setState({latitude});
            this.setState({
              mapRegion:{
                longitude: this.state.longitude,
                latitude: this.state.latitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta,
              }
            });
            console.log("longitude:", this.state.longitude);
            console.log("latitude:", this.state.latitude);
          });
      },
      1000
    );

  this.setState({ 
    coordinate:{
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      }
    });

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

  regionChange: function(region){
    this.setState({
      coordinate: {
        longitude: region.longitude,
        latitude: region.latitude,
      }
    });

  },

  showPopover() {
    this.refs.button.measure((ox, oy, width, height, px, py) => {
      this.setState({
        isVisible: true,
        buttonRect: {x: px, y: py, width: width, height: height}
      });
    });
  },

  closePopover() {
    this.setState({isVisible: false});
  },

  onDogNumberClicked:function(event){
    this.setState({dogNumberSelected: !this.state.dogNumberSelected});
  },

  onEstimateTimeClicked: function(event){
    this.setState({estimateTimeSelected: !this.state.estimateTimeSelected})
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
        closedDrawerOffset={-1}
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
          <Image style = {styles.TopBarBG}
                source = {require('../ios/top.png')}
                />
          <TouchableOpacity style={styles.toolbarButton}
                onPress={this.openDrawer}>
                <Image style = {{resizeMode: 'stretch'}}
                  source = {require('../ios/Shape.png')}
                  />
          </TouchableOpacity>
          <Text style = {{
              marginTop: 34,
              marginLeft: 92,
              color: 'white',
              fontSize: 18,
              fontFamily: 'SanFranciscoDisplay-Medium',
              backgroundColor: 'transparent',
          }}>Always Around</Text>
        </View>
        <MapV
            style={styles.map}
            followsUserLocation={true}
            showsUserLocation={true}
            //region={this.state.mapRegion}
            maxDelta = {0.9}
            onRegionChange = {this.regionChange}
          >
        </MapV>
        <View style = {styles.bottomMenu}>
        <TouchableOpacity style = {styles.buttonRefresh}>
          <Image style = {{
            width: 38,
            height: 38
            }}
            source = {require('../ios/location.png')}
          />
        </TouchableOpacity>
        <View style = {styles.optionsContainer}>
          <View style = {styles.selectDogNumber}>
            <TouchableOpacity style = {{
              marginLeft: 11,
              marginTop: 11,
              }}
              onPress = {this.onDogNumberClicked}
              >
              <Image source = {this.state.dogNumberSelected? require('../ios/down.png'): require('../ios/up.png')}/>
            </TouchableOpacity>
              <Text style = {styles.optionTextDog}>Number of Dogs</Text>
          </View>

          <View style = {styles.selectTime}>
            <TouchableOpacity style = {{
              marginLeft: 11,
              marginTop: 11,
              }}
              onPress = {this.onEstimateTimeClicked}>
              <Image source = {this.state.estimateTimeSelected? require('../ios/down.png'): require('../ios/up.png')}/>
            </TouchableOpacity>
              <Text style = {styles.optionTextTime}>Time Estimate</Text>
          </View>
        </View>
        <TouchableOpacity style = {styles.buttonSetPickUp}>
          <Text style = {{
              marginTop: 10,
              marginLeft: 113,
              color: 'white',
              fontSize: 22,
              fontFamily: 'SanFranciscoDisplay-Medium',
              backgroundColor: 'transparent',
          }}>SET PICKUP</Text>
        </TouchableOpacity>
        </View>
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
    //justifyContent: 'flex-end',
    //alignItems: 'center',
  },

  TopBarContainer:{
    position: 'absolute',
    backgroundColor: '#E15668',
    top: 0,
    left: 0,
    right: 0,
    height: 72,
    flexDirection:'row'
  },

  TopBarBG:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    //width: 375,
    height: 72,
    resizeMode: 'stretch',
  },

  map: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
  },

  toolbarButton:{
    
    marginTop:40,
    marginLeft: 19,
    //alignItems:'center'
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

  bottomMenu:{
    position: 'absolute',
    top: 555,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    //opacity: 0.8,
    height: 112
  },

  buttonRefresh:{
    position: 'absolute',
    right: 19,
    bottom: 122,
  },

  buttonSetPickUp:{
    position: 'absolute',
    bottom: 10,
    left: 19,
    right: 19,
    height: 46,
    //width: 337,
    borderRadius: 6,
    backgroundColor: '#E15667',
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2} 
  },

  optionsContainer:{
    position: 'absolute',
    bottom: 66,
    right: 19,
    left: 19,
    height: 46,
    //width: 337,
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },

  selectDogNumber:{
    marginTop: 0,
    marginLeft: 0,
    borderRadius: 6,
    backgroundColor: 'white',
    width: 163,
    flexDirection: 'row',
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2} 
  },

  selectTime:{
    marginLeft: 11,
    marginTop: 0,
    borderRadius: 6,
    backgroundColor: 'white',
    width: 163,
    flexDirection:'row',
    shadowRadius: 0.1,
    shadowOpacity: 0.5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2} 
  },

  optionTextDog:{
    marginTop: 13,
    marginLeft: 8,
    color: '#646464',
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Regular',
    //backgroundColor: 'transparent',
  },

  optionTextTime:{
    marginTop: 13,
    marginLeft: 15,
    color: '#646464',
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Regular',
    //backgroundColor: 'transparent',
  },



});

module.exports = MainPage;