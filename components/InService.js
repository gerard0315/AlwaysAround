'use strict';
import {Actions} from 'react-native-router-flux';
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

var detail = [
  {
    "index":1,
    "detail":{
      "type": "visa",
      "card_number": "1111111111113333",
      "icon" : null,
      "ccv": 123,
      "post_code": "L3 5XA",
      "expiry_date": "07/17"
    },
  },
  {
    "index":2,
    "detail":{
      "type": "master",
      "card_number": "2222222222224444",
      "icon" : null,
      "ccv": 123,
      "post_code": "WC1N 1AS",
      "expiry_date": "07/18"
    }
  },
  {
    "index":3,
    "detail":{
      "type": "express",
      "card_number": "3333333333335555",
      "icon" : null,
      "ccv": 123,
      "post_code": "NW1 6DP",
      "expiry_date": "08/19"
    }
  },
  {
    "index":4,
    "detail":{
      "type": "paypal",
      "card_number": "    .com",
      "icon" : null,
    }
  },

]

export default class InServicePage extends Component{
  static defaultProps = {
    };

  static propTypes = {
        service: React.PropTypes.object.isRequired,
        location: React.PropTypes.string.isRequired,
        lng: React.PropTypes.number.isRequired,
        lat: React.PropTypes.number.isRequired,
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
      serviceType: null,
      //dogNumber: this.props.infoData.length,
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
      drawerOpacity: 0,
    };
  }

  componentWillMount(){
    if(this.state.isShelter === false){
      this.setState({serviceType: 'AA Carer'});
      this.setState({serviceImage: require('../ios/AA_Carer.png')});
    }else{
      this.setState({serviceType: 'AA Shelter'});
      this.setState({serviceImage: require('../ios/AA_Shelter.png')});
    }

    var type = detail[this.props.paymentType - 1].detail.type;
    if (type === "visa"){
      this.setState({cardIcon: require('../ios/Visa-dark.png')});
    }else if(type === 'master'){
      this.setState({cardIcon: require('../ios/MasterCard-dark.png')});
    }else if(type === 'express'){
      this.setState({cardIcon: require('../ios/AmericanExpress-dark.png')});
    }else if(type === 'paypal'){
      this.setState({cardIcon: require('../ios/Paypal-dark.png')});
    }
  }

  componentDidMount(){
    this.setState({drawerOpacity: 1});
  }

  openDrawer(){
    this._drawer.open();
    //StatusBar.setHidden(true, null);
    console.log('openDrawer');
  }

  onDrawerOpen(event){
    this.timer = setTimeout(
        () => {
      StatusBar.setHidden(true, null);
    }, 10);
  }

  onDrawerClose(event){
    this.timer = setTimeout(
        () => {
      StatusBar.setHidden(false, null);
    }, 10);
  }

  closeDrawer(){
    this._drawer.close();
    //StatusBar.setHidden(false, null);
    console.log('closeDrawer');
  }

  onPressCancel(){
    this.setState({drawerOpacity: 0});
    this.timer = setTimeout(
        () => {
      Actions.pop();
    }, 5);
  }

  render(){
    return(
      <View style = {styles.container}>
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        captureGestures={true}
        content={<ControlPanel closeDrawer={this.closeDrawer.bind(this)}/>}
        //disabled = {true}
        captureGestures = {true}
        onOpen = {this.onDrawerOpen.bind(this)}
        onClose = {this.onDrawerClose.bind(this)}
        panOpenMask = {20}
        openDrawerOffset={0.33}
        panCloseMask={0}
        closedDrawerOffset={0}
        negotiatePan={false}
        style = {[styles.drawerStyles, {opacity: 0}]}
        acceptTap = {true}
        acceptPan = {true}
        tapToClose={true}
        open = {false}
        initializeOpen = {false}
        tweenHandler={(ratio) => ({
          main: {opacity:(2-ratio)/2 }
        })}
        >
          <MapView
              style={styles.map}
              //showsUserLocation={true}
              region = {this.state.mapRegion}
              maxDelta = {0.9}
            />

          <View style = {styles.TopBarContainer}>
            <TouchableOpacity style={styles.toolbarButton}
                  onPress={this.openDrawer.bind(this)}>
                  <Image style = {{resizeMode: 'stretch'}}
                    source = {require('../ios/Shape.png')}
                    />
            </TouchableOpacity>
            <Text style = {{
                marginTop: 30,
                marginLeft: 70,
                color: 'white',
                fontSize: 20,
                fontFamily: 'SanFranciscoDisplay-Medium',
                backgroundColor: 'transparent',
            }}>Service En Route</Text>
          </View>
          <View style = {styles.selectService}>
          <View style = {styles.serviceDetail}>
            <Text style = {[styles.serviceType, {color: '#FFC927'}]}>{this.state.serviceType}</Text>
            <Text style = {[styles.estimatedTime, {color: '#FFC927'}]}>{this.state.estTime + ' min'}</Text>
            <Image style = {{height: 35, marginTop: 2, alignSelf: 'center'}}
              source = {this.state.serviceImage}/>
          </View>
        </View>
        <View style = {{
          position: 'absolute',
          top: 295.5,
          left: 162.5,
          backgroundColor: 'transparent',
          height: 50, 
          width: 50
          }}>
          <Image style = {{marginTop:0, marginLeft: 0, width: 50, height: 50, resizeMode: 'stretch'}} source = {require('../ios/MapMarker.png')}/>
        </View>
        <View style = {styles.pickUpPadding}/>
        <View style = {styles.pickUpLocationContainer}>
          <View style = {{marginLeft: 0, marginTop: 0, height: 34, flexDirection: 'row', alignItems: 'center'}} activeOpacity = {1.0}>
            <View style = {{marginTop: 0, marginLeft: -30, width: 375, height: 34}}>
              <Text style = {{
                marginTop: 5, 
                //marginLeft: 97,
                textAlign: 'center', 
                fontSize: 20,
                fontFamily: 'SanFranciscoDisplay-Regular',
                color: '#727272',
                backgroundColor: 'transparent'
                }}>{this.props.location}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style = {styles.pickUpButton} opacity = {0.9} 
          onPress = {this.onPressCancel.bind(this)}>
          <Image style = {{marginTop: 5, marginLeft: 0, width: 337, opacity: 0.9}}
            source = {require('../ios/cancel.png')}/>
        </TouchableOpacity>
      </Drawer>
       </View>
    )}

}

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

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
    //paddingLeft: -10   
  },

  drawerStyles:{
    shadowColor: 'black', 
    shadowOpacity: 0.8, 
    shadowRadius: 3,
    //backgroundColor: 'black'
    //shadowOffset:{x: 10, y: 0}
  },

  selectService:{
    position: 'absolute',
    backgroundColor: '#EA4D4E',
    top: 54,
    left: 0,
    right: 0,
    height: 100,
    alignItems: 'center',
    opacity: 0.95,
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5},
  },

  serviceDetail:{
    //marginTop: 5,
    height: 95,
    width: 120,
    flexDirection: 'column',
    justifyContent: 'center',
    //backgroundColor: 'white'
  },

  serviceType: {
    fontSize: 18,
    fontFamily: 'SanFranciscoDisplay-Medium',
    textAlign: 'center',
    marginTop: 10,
  },

  estimatedTime: {
    fontSize: 14,
    paddingTop: -1,
    fontFamily: 'SanFranciscoDisplay-Regular',
    textAlign: 'center'
  },

  pickUpPadding: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'white',
    opacity: 0.8,
    flexDirection: 'column',
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -0.5}
  },

  pickUpLocationContainer:{
    position: 'absolute',
    top: 567,
    left: 19,
    right: 19,
    height: 34,
    //backgroundColor: 'white'
    justifyContent: 'center'
  },

  pickUpButton: {
    position: 'absolute',
    top: 596,
    left: 19,
    right: 19,
    height: 56,
    opacity: 0.95,
    //backgroundColor: 'white'
  },

});