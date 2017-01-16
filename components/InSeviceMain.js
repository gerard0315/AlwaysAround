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
  static propTypes = {
        service: React.PropTypes.object.isRequired,
        location: React.PropTypes.string.isRequired,
        lng: React.PropTypes.number.isRequired,
        lat: React.PropTypes.number.isRequired,
        infoData: React.PropTypes.array.isRequired,
        time: React.PropTypes.number.isRequired,
        paymentType: React.PropTypes.number.isRequired,
    }; 

  constructor(props){
    super(props);
    this.state= {
      mapRegion:{
        latitude: this.props.lat,
        longitude: this.props.lng,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      },
      serviceImage: null,
      isShelter: this.props.service.onShelter,
      estTime: this.props.service.time,
      serviceType: null,xs
      dogNumber: this.props.infoData.length,
      existSecond: false,
      existThird: false,
      existForth: false,
      nameContainerHeight: new Animated.Value(0),
      displayName: false,
      displayNameOpacity: new Animated.Value(0),
      confirmInfoSlide: new Animated.Value(19),
      requstingSlide: new Animated.Value(-150),
      showRequesting: new Animated.Value(0),
      title: 'Confirmation',
      isRequesting: false,
      showBackbutton: new Animated.Value(1),
      //lastFourDigit: 0,
      cardIcon: null,
      slider: new Animated.Value(120),
      flag: false,
    };
  }

  componentWillMount(){
    console.log("in service main");
  }

  render(){
    return(
        <View style = {styles.container}>
        {/*
          <MapView
              style={styles.map}
              //showsUserLocation={true}
              region = {this.state.mapRegion}
              maxDelta = {0.9}
            />

          <View style = {styles.TopBarContainer}>
            <TouchableOpacity style={styles.toolbarButton}
                  //onPress={this.openDrawer}
                  >
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
        */}
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