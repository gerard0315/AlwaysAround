'use strict';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import MapView from 'react-native-maps';
import React, {Component, propTypes} from 'react';
import ControlPanel from './Drawer.js';
import Drawer from 'react-native-drawer';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  Navigator,
  ListView,
  Easing,
  TextInput,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native';


export default class InServicePage extends Component{
  render(){
    return(
        <View style = {styles.container}>
          <MapView
              style={styles.map}
              //showsUserLocation={true}
              region = {this.state.mapRegion}
              maxDelta = {0.9}
            />

          <View style = {styles.TopBarContainer}>
            <TouchableOpacity style={styles.toolbarButton}
                  onPress={this.openDrawer}>
                  <Image style = {{resizeMode: 'stretch'}}
                    source = {require('../ios/Shape.png')}
                    />
            </TouchableOpacity>
            <Text style = {{
                marginTop: 30,
                marginLeft: 80,
                color: 'white',
                fontSize: 20,
                fontFamily: 'SanFranciscoDisplay-Medium',
                backgroundColor: 'transparent',
            }}>Service En Route</Text>
          </View>
        </View>
    )}
}


var styles = StyleSheet.create({
  TopBarContainer:{
    position: 'absolute',
    backgroundColor: '#EA4D4E',
    top: 0,
    left: 0,
    right: 0,
    height: 54,
    flexDirection:'row',
    opacity: 0.95
  },

  map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

  toolbarButton:{
    
    marginTop:35,
    marginLeft: 19,
    //alignItems:'center'
  },
  toolbarButtonText:{
    paddingTop: 5,
    color:'#fff',
    fontWeight: 'normal',
    fontSize: 13,   
  },
});