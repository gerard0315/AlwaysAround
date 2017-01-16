'use strict';
import {Actions, ActionConst} from 'react-native-router-flux';
import MapView from 'react-native-maps';
import React, {Component, propTypes} from 'react';
import ControlPanel from './Drawer.js';
import Drawer from 'react-native-drawer';
import Communications from 'react-native-communications';

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
  Dimensions,
  Modal,
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
        data: React.PropTypes.object.isRequired,
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
      cardIcon: null,
      cancelSlide: new Animated.Value(112),
      flag: false,
      drawerOpacity: 0,
      modalVisible: false,
      title: 'Service En Route',
      titleOffSet: 70,
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
    this.timer = setTimeout(
        () => {
      this.setState({title: "We're Waiting For You"});
      this.setState({titleOffSet: 50});
      Animated.timing(this.state.cancelSlide, {
        toValue: 375, // 目标值
        duration: 100,
        easing: Easing.linear, // 动画时间
      }).start();
    }, 10000);
  }

  componentWillUnmount(){
    this.timer && clearTimeout(this.timer);
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
      Actions.home({type: ActionConst.RESET});
    }, 5);
  }

  onDismiss(){
    this._setModalVisible(false);
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onPressCall(){
    this._setModalVisible(true);
  }

  callDriver(){
    this._setModalVisible(false);
    Communications.phonecall('07957050343', true);
  }

  render(){
    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    };
    return(
      <View style = {styles.container}>
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        captureGestures={true}
        content={<ControlPanel closeDrawer={this.closeDrawer.bind(this)} data = {this.props.data}/>}
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
        <Modal animationType={'fade'}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {this._setModalVisible(false)}}>
              <View style = {[styles.modalContainer, modalBackgroundStyle]}>
                <TouchableOpacity style = {styles.dismissPaddingTop} onPress = {() => {this._setModalVisible(false)}}>
                </TouchableOpacity>
                <View style = {styles.callModal}>
                  <TouchableOpacity style = {{marginTop: 0, marginLeft: 0, height: 42, width: 260, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}
                    onPress = {this.callDriver.bind(this)}> 
                    <Text style = {[styles.modalText, {color: '#62C6C6'}]}>CALL</Text>
                  </TouchableOpacity>
                  <View style = {{height: 1, marginLeft: 0, marginTop: 0, width: 260, backgroundColor: '#727272'}}/>
                  <TouchableOpacity style = {{marginTop: 0, marginLeft: 0, height: 42, width: 260, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}
                    onPress = {() => {this._setModalVisible(false)}}> 
                    <Text style = {[styles.modalText, {color: '#727272'}]}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style = {styles.dismissPaddingBottom} onPress = {() => {this._setModalVisible(false)}}>
                </TouchableOpacity>
              </View>
        </Modal>
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
                marginLeft: this.state.titleOffSet,
                color: 'white',
                fontSize: 20,
                fontFamily: 'SanFranciscoDisplay-Medium',
                backgroundColor: 'transparent',
            }}>{this.state.title}</Text>
          </View>
          <View style = {styles.selectService}>
            <View style = {styles.serviceDetail}>
              <Text style = {[styles.serviceType, {color: '#FFC927'}]}>{this.state.serviceType}</Text>
              <Text style = {[styles.estimatedTime, {color: '#FFC927'}]}>{this.state.estTime + ' min'}</Text>
              <Image style = {{height: 35, marginTop: 2, alignSelf: 'center'}}
                source = {this.state.serviceImage}/>
            </View>
            <View style = {styles.platePadding}>
              <Text style = {styles.plateNumber}>FG64XUL</Text>
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
        <Animated.View style = {[styles.cancelInfo, {left: this.state.cancelSlide}]}>
          <Text style = {styles.cancelText}>{"FREE CANCELATION" + "\n" + "IN 5 MINUTES"}</Text>
        </Animated.View>
        <View style = {styles.driverInfo}>
          <View style = {styles.driverAvatar}>
          </View>
          <View style = {styles.ratingBox}>
            <Text style = {styles.rating}>4.4</Text>
            <View style = {{marginLeft: 0, width:1, height: 12, backgroundColor: '#727272'}}/>
            <Image style = {{marginTop: 0, marginLeft: 1, width: 10, height: 10, resizeMode: 'stretch', alignSelf: 'center'}} source = {require('../ios/Star.png')}/>
          </View>
          <View style = {styles.infoDriver}>
            <View style = {{marginLeft: 0, marginTop: 0, width: 92, height: 46, justifyContent: 'center'}}>
              <Text style = {styles.infoText}>Baetylus</Text>
            </View>
            <View style = {{marginLeft: 0, height: 26, width: 1, backgroundColor: '#727272'}}/>
            <TouchableOpacity style = {{marginLeft: 0, marginTop: 0, width: 71, height: 46, justifyContent: 'center'}} onPress = {this.onPressCall.bind(this)}>
              <Text style = {styles.infoText}>Contact</Text>
            </TouchableOpacity>
            <View style = {{marginLeft: 0, height: 26, width: 1, backgroundColor: '#727272'}}/>
          <TouchableOpacity style = {{marginTop: 0, marginLeft: 0, width: 120, height: 46, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}} activeOpacity = {0.9}
            >
            <Image style = {{marginTop: 0, marginLeft: 0, height: 20, width: 34}}
              source = {this.state.cardIcon}/>
            <Text style = {[styles.infoText, {color: '#727272', marginLeft: 6}]}>{detail[this.props.paymentType - 1].detail.card_number.substr(detail[this.props.paymentType - 1].detail.card_number.length - 4)}</Text>
            <Image style = {{marginTop: 0, marginLeft: 6, height: 8, width: 13, resizeMode: 'stretch'}}
              source = {require('../ios/payment_down.png')}/>
          </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
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
    //justifyContent: 'center',
    //backgroundColor: 'white'
  },

  plateNumber:{
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'SanFranciscoDisplay-Regular',
    color: '#727272',
    backgroundColor: 'transparent',
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

  platePadding:{
    position: 'absolute',
    bottom: 4,
    left: 159,
    height: 14,
    width: 57,
    borderRadius: 1,
    backgroundColor: 'white',
    shadowRadius: 0.8,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
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

  driverInfo:{
    position: 'absolute',
    bottom: 110,
    left: 19,
    right: 19,
    height: 52,
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },

  driverAvatar:{
    marginTop: 0, 
    marginLeft: 0,
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: 'white',

  },

  infoDriver:{
    marginTop: 6, 
    marginLeft: 6,
    height: 46,
    width: 285,
    borderRadius: 6,
    shadowRadius: 0.8,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    backgroundColor: 'white',
    opacity: 0.8,
    flexDirection: 'row',
    shadowOffset: {width: 0, height: 0},
    alignItems: 'center'
  },

  cancelInfo:{
    position: 'absolute',
    bottom: 162,
    height: 46,
    width: 151,
    backgroundColor: '#62C6C6',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelText:{
    fontFamily: 'SanFranciscoDisplay-Medium',
    fontSize: 14,
    flexWrap: 'wrap',
    //paddingTop: 5,
    //paddingLeft: 10,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },

  infoText:{
    fontFamily: 'SanFranciscoDisplay-Regular',
    fontSize: 16,
    color: '#727272',
    textAlign: 'center'
  },

  ratingBox:{
    position: 'absolute',
    bottom: 0,
    height: 12,
    width: 34,
    left: 6,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 1,
    shadowRadius: 0.8,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
  },

  rating:{
    fontSize: 10,
    fontFamily: 'SanFranciscoDisplay-Regular',
    color: '#727272',
    width: 21,
    textAlign: 'center'
  },

  modalContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,       
  },

  dismissPaddingTop:{
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 291,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dismissPaddingBottom:{
    position: 'absolute',
    left: 0,
    top: 291+ 85,
    right: 0,
    height: 291,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  callModal:{
    width: 260,
    height: 85,
    borderRadius: 6,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'column'
  },

  modalText:{
    fontSize: 18,
    fontFamily: 'SanFranciscoDisplay-Medium',
    textAlign: 'center'
  }

});