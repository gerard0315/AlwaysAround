'use strict';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
//import RegisterPage from './RegisterPage.js'

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
} from 'react-native';

exports.framework = 'React';


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
    backgroundColor: '#3b5998',
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
    shadowOpacity: 0.8, 
    shadowRadius: 3
  },

  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },

});

var SideMenu = React.createClass({

  render(){
        return <React.Text style={styles.text}>MenuPage</React.Text>;
  },
});

var MainPage = React.createClass({
  watchID: (null: ?number),

  getInitialState: function() {
    return {
      latitude: 0,
      longitude: 0,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  },

  componentDidMount: function() {

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

  componentWillUnmount: function() {

    navigator.geolocation.clearWatch(this.watchID);
  },

  openDrawer: function(){
    this._drawer.open();
    console.log('openDrawer');
  },

	render() {
		return( 
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={<SideMenu/>}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        style = {styles.drawerStyles}
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

module.exports = MainPage;