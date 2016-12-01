'use strict';
import {Actions, ActionConst} from 'react-native-router-flux';
import MapView from 'react-native-maps';
import React, {Component, propTypes} from 'react';
import {
  StyleSheet,
  //MapView,
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


export default class ConfirmationPage extends Component{
  static defaultProps = {
    };

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
      serviceType: null,
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
    if(this.state.isShelter === false){
      this.setState({serviceType: 'AA Carer'});
      this.setState({serviceImage: require('../ios/AA_Carer.png')});
    }else{
      this.setState({serviceType: 'AA Shelter'});
      this.setState({serviceImage: require('../ios/AA_Shelter.png')});
    }

    if(this.props.infoData.length === 2){
      this.setState({existSecond: true});
      this.setState({existThird: false});
      this.setState({existForth: false});
      this.props.infoData.push(' ');
      this.props.infoData.push(' ');
    }else if(this.props.infoData.length === 3){
      this.setState({existSecond: true});
      this.setState({existThird: true});
      this.setState({existForth: false});
      this.props.infoData.push(' ');
    }else if(this.props.infoData.length === 4){
      this.setState({existSecond: true});
      this.setState({existThird: true});
      this.setState({existForth: true});
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

  onPressDogNumber(event){
    if(this.state.displayName === false){
      this.setState({displayName: true});
      Animated.timing(this.state.nameContainerHeight, {
        toValue: 34 * this.state.dogNumber, // 目标值
        duration: 100,
        delay: 5,
        easing: Easing.linear, // 动画时间
      }).start();
      Animated.timing(this.state.displayNameOpacity, {
        toValue: 1, // 目标值
        duration: 50,
        delay: 50,
        easing: Easing.linear, // 动画时间
      }).start();
    }else if(this.state.displayName === true){
      this.setState({displayName: false});
      Animated.timing(this.state.nameContainerHeight, {
        toValue: 0 , // 目标值
        duration: 100,
        delay: 5,
        easing: Easing.linear, // 动画时间
      }).start(); 
      Animated.timing(this.state.displayNameOpacity, {
        toValue: 0, // 目标值
        duration: 10,
        delay: 100,
        easing: Easing.linear, // 动画时间
      }).start();    
    }
  }

  animation(){
    this.timer = setTimeout(
      () => {
    if(this.state.isRequesting === true){
      Animated.sequence([
        Animated.timing(this.state.slider, {
          toValue: 0,
          duration: 1,
        }),
        Animated.timing(this.state.slider, {
          toValue: 375,
          duration: 1000,
        }),
        Animated.timing(this.state.slider, {
          toValue: 0,
          duration: 1000
        })
      ]).start(() => {
        this.animation();
      });      
    }else{
      Animated.timing(this.state.slider, {
          toValue: 120,
          duration: 100
        }).start();
    }
  }, 5);

  }

  onPressRequst(event){
    this.timer && clearTimeout(this.timer);
    if (this.state.isRequesting === false){
      Animated.timing(this.state.confirmInfoSlide, {
        toValue: 375, // 目标值
        duration: 200,
        delay: 5,
        easing: Easing.linear, // 动画时间
      }).start(); 

      Animated.timing(this.state.requstingSlide, {
        toValue: 112, // 目标值
        duration: 200,
        delay: 5,
        easing: Easing.linear, // 动画时间
      }).start();

      Animated.timing(this.state.showRequesting, {
        toValue: 1, // 目标值
        duration: 100,
        delay: 5,
        easing: Easing.linear, // 动画时间
      }).start();

      Animated.timing(this.state.showBackbutton, {
        toValue: 0, // 目标值
        duration: 100,
        delay: 5,
        easing: Easing.linear, // 动画时间
      }).start();

      this.animation();
      this.setState({title: '   Requsting'});
      this.setState({isRequesting: true});

      this.timer = setTimeout(
          () => {
            this.setState({title: 'Confirmation'});
            this.setState({isRequesting: false});
            this.setState({showBackbutton: 1}); 
            Animated.timing(this.state.requstingSlide, {
              toValue: -150, // 目标值
              duration: 10,
              delay: 1,
              easing: Easing.linear, // 动画时间
            }).start();

            Animated.timing(this.state.showRequesting, {
              toValue: 0, // 目标值
              duration: 10,
              delay: 1,
              easing: Easing.linear, // 动画时间
            }).start();           
            Actions.inService({service: this.props.service, lng: this.props.lng, lat: this.props.lat, paymentType: this.props.paymentType, location: this.props.location})}, 
          5000); 

    }else if(this.state.isRequesting === true){
      this.timer && clearTimeout(this.timer);
      Animated.timing(this.state.confirmInfoSlide, {
        toValue: 19, // 目标值
        duration: 200,
        delay: 5,
        easing: Easing.linear, // 动画时间
      }).start(); 

      Animated.timing(this.state.requstingSlide, {
        toValue: -150, // 目标值
        duration: 200,
        delay: 5,
        easing: Easing.linear, // 动画时间
      }).start();

      Animated.timing(this.state.showRequesting, {
        toValue: 0, // 目标值
        duration: 100,
        delay: 5,
        easing: Easing.linear, // 动画时间
      }).start();

      Animated.timing(this.state.showBackbutton, {
        toValue: 1, // 目标值
        duration: 100,
        delay: 5,
        easing: Easing.linear, // 动画时间
      }).start();
      this.animation();
      this.setState({title: 'Confirmation'});
      this.setState({isRequesting: false});
      this.timer && clearTimeout(this.timer);
    }
  }

  componentWillUnmount(){
    this.timer && clearTimeout(this.timer);
  }

  endAnimation(){
    Animated.sequence([
      Animated.timing(this.state.slider, {
        toValue: 120,
        duration: 0,
      }),
    ]).start(() => {
      this.endAnimation();
    });    
  }

  startAnimation(){
    Animated.sequence([
      Animated.timing(this.state.slider, {
        toValue: 0,
        duration: 1,
      }),
      Animated.timing(this.state.slider, {
        toValue: 375,
        duration: 1000,
      }),
      Animated.timing(this.state.slider, {
        toValue: 0,
        duration: 1000
      })
    ]).start(() => {
      this.startAnimation();
    });
  }

  onPressSearch(event){
      //console.log('open search');
     Actions.search({lng: this.props.lng, lat: this.props.lat});
  }

  onPressSelectPayment(){
      Actions.selectPayment({
        lat: this.props.lat, 
        lng: this.props.lng, 
        location: this.props.location, 
        service: this.props.service, 
        infoData: this.props.infoData, 
        time: this.props.time,
        paymentType: this.props.paymentType});
  }

  onBack(){
    Actions.home({type: ActionConst.BACK});
  }

  render(){
    return(
    <View style = {styles.container}>
        <MapView
            style={styles.map}
            region = {this.state.mapRegion}
            maxDelta = {0.9}
          />
        <View style = {styles.TopBarContainer}>
        <Animated.View style ={{marginLeft: 19, marginTop: 35, height: 16, width: 16, opacity: this.state.showBackbutton}}>
          <TouchableOpacity style = {{flex: 1}} onPress = {this.onBack} disable = {this.state.isRequesting}>
            <Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
              source = {require('../ios/goBack.png')}/>
          </TouchableOpacity>
        </Animated.View>
          <Text style = {{
              marginTop: 30,
              marginLeft: 96,
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
            <Animated.View style = {{marginTop: 5, width: this.state.slider, height: 5, backgroundColor: '#FFC927', alignSelf: 'center'}}/>
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
        <Animated.View style = {[styles.dogNameContainer, {height: this.state.nameContainerHeight, opacity: this.state.displayNameOpacity}]}>
          <View style = {[styles.cell, {height: 34}]}>
            <Text style = {[styles.infoText, {color: '#727272'}]}>{this.props.infoData[0]}</Text>
          </View>
          <View style = {[styles.cell, {height: (this.state.existSecond)? 34:0}]}>
            <Text style = {[styles.infoText, {color: '#727272'}]}>{this.props.infoData[1]}</Text>
          </View>
          <View style = {[styles.cell, {height: (this.state.existThird)? 34:0}]}>
            <Text style = {[styles.infoText, {color: '#727272'}]}>{this.props.infoData[2]}</Text>
          </View>
          <View style = {[styles.cell, {height: (this.state.existForth)? 34:0}]}>
            <Text style = {[styles.infoText, {color: '#727272'}]}>{this.props.infoData[3]}</Text>
          </View>
        </Animated.View>
        <Animated.View style = {[styles.confirmInfo, {left: this.state.confirmInfoSlide}]}>
          <View style = {{marginTop: 0, marginLeft: 0, width: 70, height: 46, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {[styles.infoText, {color: '#727272'}]}>£ <Text style = {[styles.infoText, {color: '#FFC927'}]}>18</Text></Text>
          </View>
          <View style = {{marginLeft: 0, marginTop: 10, height: 26, width: 1, backgroundColor: '#727272'}}/>
          <TouchableOpacity style = {{marginTop: 0, marginLeft: 0, width: 70, height: 46, justifyContent: 'center', alignItems: 'center'}} onPress = {this.onPressDogNumber.bind(this)}>
            <Text style = {[styles.infoText, {color: '#FFC927'}]}>{this.state.dogNumber}<Text style = {[styles.infoText, {color: '#727272'}]}> Dogs</Text></Text>
          </TouchableOpacity>
          <View style = {{marginLeft: 0, marginTop: 10, height: 26, width: 1, backgroundColor: '#727272'}}/>
          <TouchableOpacity style = {{marginTop: 0, marginLeft: 0, width: 70, height: 46, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {[styles.infoText, {color: '#FFC927'}]}>{this.props.time}<Text style = {[styles.infoText, {color: '#727272'}]}> Hours</Text></Text>
          </TouchableOpacity>
          <View style = {{marginLeft: 0, marginTop: 10, height: 26, width: 1, backgroundColor: '#727272'}}/>
          <TouchableOpacity style = {{marginTop: 0, marginLeft: 0, width: 120, height: 46, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}} activeOpacity = {0.9}
            onPress = {this.onPressSelectPayment.bind(this)}>
            <Image style = {{marginTop: 0, marginLeft: 0, height: 20, width: 34}}
              source = {this.state.cardIcon}/>
            <Text style = {[styles.infoText, {color: '#727272', marginLeft: 6}]}>{detail[this.props.paymentType - 1].detail.card_number.substr(detail[this.props.paymentType - 1].detail.card_number.length - 4)}</Text>
            <Image style = {{marginTop: 0, marginLeft: 6, height: 8, width: 13, resizeMode: 'stretch'}}
              source = {require('../ios/payment_down.png')}/>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style = {[styles.requstingPadding, {left: this.state.requstingSlide, opacity: this.state.showRequesting}]}>
          <Text style = {styles.requsting}>{"WE'RE CONFIRMING" +'\n'+ "YOUR REQUEST"}</Text>
        </Animated.View>
        <View style = {styles.pickUpPadding}/>
        <View style = {styles.pickUpLocationContainer}>
          <TouchableOpacity style = {{marginLeft: 0, marginTop: 0, height: 34, flexDirection: 'row', alignItems: 'center'}} activeOpacity = {1.0} 
            disable = {this.state.isRequesting} onPress = {this.onPressSearch.bind(this)}>
            <Animated.View style = {{flex: 1, opacity: this.state.showBackbutton}}>
              <Image style = {{marginLeft: 0 , width: 20, height: 20, resizeMode: 'stretch', opacity: 0.8}}
                  source = {require('../ios/Oval.png')}/>
            </Animated.View>
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
          </TouchableOpacity>
        </View>
        <TouchableOpacity style = {styles.pickUpButton} opacity = {0.9} onPress = {this.onPressRequst.bind(this) }>
          <Image style = {{marginTop: 5, marginLeft: 0, width: 337, opacity: 0.9}}
            source = {(this.state.isRequesting)? require('../ios/cancel.png') : require('../ios/pick_up.png')}/>
        </TouchableOpacity>
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

  map: {
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

  serviceDetail:{
    marginTop: 5,
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

  confirmInfo:{
    position: 'absolute',
    bottom: 110,
    height: 46,
    left: 19,
    width: 375-19-19,
    borderRadius: 6,
    shadowRadius: 0.8,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    backgroundColor: 'white',
    opacity: 0.8,
    flexDirection: 'row',
    shadowOffset: {width: 0, height: 0},
  },

  infoText:{
    fontFamily: 'SanFranciscoDisplay-Regular',
    fontSize: 16,

  },

  dogNameContainer:{
    position: 'absolute',
    bottom: 110 + 46 + 10,
    left: 19 + 70,
    width: 110,
    borderRadius: 6,
    shadowRadius: 0.8,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    backgroundColor: 'white',
    opacity: 0.8,
    flexDirection: 'column',
    shadowOffset: {width: 0, height: 0},  
  },

  cell:{
    marginTop: 0,
    marginLeft: 0,
    //height: 34,
    width: 110,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },

  requstingPadding:{
    position: 'absolute',
    bottom: 110,
    height: 46,
    //left: 19,
    width: 151,
    backgroundColor: '#62C6C6',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  requsting:{
    fontFamily: 'SanFranciscoDisplay-Medium',
    fontSize: 14,
    flexWrap: 'wrap',
    //paddingTop: 5,
    //paddingLeft: 10,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center'
  }

});