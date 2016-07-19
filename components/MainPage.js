'use strict';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
var TimerMixin = require('react-timer-mixin');
import ControlPanel from './Drawer.js';

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
  TextInput,
  TouchableHighlight,
  StatusBar,
  ScrollView,
} from 'react-native';

exports.framework = 'React';

var MainPage = React.createClass({
  watchID: (null: ?number),
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      numberSelectHeight: new Animated.Value(0),
      timeSelectHeight: new Animated.Value(0),
      numberOpacity: new Animated.Value(0),
      timeSelectOpacity: new Animated.Value(0),
      timeSelectDisabled: true,
      numberSelectDisabled: true,
      numberText: 'Select Dog',
      numberSelected: false,
      timeText: 'Time Est.',
      timeSelected: false,

      sliderPosition: new Animated.Value(202.5),
      carerTextLeft: new Animated.Value(400),
      shelterTextLeft: new Animated.Value(0),
      descriptionDisplay: 0,
      descriptionHeight: new Animated.Value(0),
      shelterClicked : false,
      carerClicked: false,

      drawerClosed: true,

      latitude: 0,
      longitude: 0,
      dogNumber: 0,
      timeEstimation: 0,
      dogNumberSelected: false,
      estimateTimeSelected: false,
      mapRegion: {
        latitude: 0,
        longitude: 0,
      },

      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      number: 0,
      time: '',
      oneClicked: false,
      twoClicked: false,
      threeClicked: false,
      fourClicked: false,
      firstClicked: false,
      secondClicked: false,
      thridClicked: false,
      fourthClicked: false,
      optionTextColor: '#727272',

      carerColor: 'white',
      shelterColor: '#FFC927',
      locationText: 'Aldgate Tower',
    };
  },

  componentDidMount: function() {
    StatusBar.setHidden(false, null);
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
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
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
  this.setState({drawerClosed: false});
  this.setState({locationText: 'Aldgate Tower'});
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
    this.setState({numberSelectHeight: 0});
    this.setState({drawerClosed: true});
    this._drawer.close();
    TimerMixin.clearInterval(this.timer)
    StatusBar.setHidden(false, null);
  },

  componentWillMount: function(){
    StatusBar.setHidden(false, null);
    //this.setState({sliderPosition: 202.5})
  },

  openDrawer: function(){
    this._drawer.open();
    //StatusBar.setHidden(true, null);
    console.log('openDrawer');
  },

  onDrawerOpen: function(event){
  this.setTimeout(
      () => {
    StatusBar.setHidden(true, null);
  }, 10);
  },

  onDrawerClose: function(event){
  this.setTimeout(
      () => {
    StatusBar.setHidden(false, null);
  }, 10);
  },

  closeDrawer: function(){
    this._drawer.close();
    //StatusBar.setHidden(false, null);
    console.log('closeDrawer');
  },

  regionChange: function(region){
    this.setState({
      coordinate: {
        longitude: region.longitude,
        latitude: region.latitude,
      }
    });

  },

  openNameSelector: function(){
    this.setState({numberSelectDisabled: false});
    Animated.timing(this.state.numberSelectHeight, {
      toValue: 124, 
      duration: 120,
      easing: Easing.linear,
    }).start();

    Animated.timing(this.state.numberOpacity, {
      toValue: 1, // 目标值
      duration: 20,
      delay: 80,
      easing: Easing.linear, // 动画时间
    }).start();
  },

  closeNameSelector: function(){
    this.setState({numberSelectDisabled: true});
    Animated.timing(this.state.numberSelectHeight, {
      toValue: 0, 
      duration: 100,
          //delay: ,
      easing: Easing.linear,
    }).start();

    Animated.timing(this.state.numberOpacity, {
      toValue: 0, // 目标值
      duration: 10,
      easing: Easing.linear, // 动画时间
    }).start();
  },

  openTimeSelector: function(){
    this.setState({timeSelectDisabled: false});
    Animated.timing(this.state.timeSelectHeight, {
      toValue: 124, 
      duration: 120,
          //delay: ,
      easing: Easing.linear,
    }).start();

    Animated.timing(this.state.timeSelectOpacity, {
      toValue: 1, // 目标值
      duration: 20,
      delay: 80,
      easing: Easing.linear, // 动画时间
    }).start();
  },

  closeTimeSelector: function(){
    this.setState({timeSelectDisabled: true});
    Animated.timing(this.state.timeSelectHeight, {
      toValue: -50, 
      duration: 100,
          //delay: ,
      easing: Easing.linear,
    }).start();

    Animated.timing(this.state.timeSelectOpacity, {
      toValue: 0, // 目标值
      duration: 10,
      easing: Easing.linear, // 动画时间
    }).start();
  },

  onDogNumberClicked:function(event){
    this.setState({dogNumberSelected: !this.state.dogNumberSelected});
    //this.setState({numberSelectDisabled: !this.state.numberSelectDisabled});
    if (this.state.dogNumberSelected === true){
        this.setState({numberText: 'Done'});
        this.openNameSelector();
    }else{
      if(this.state.number === 0){
        this.setState({numberText: 'Select Dog'});
        this.closeNameSelector();
      }else if(this.state.number === 1){
        this.setState({numberText: this.state.number + ' Dog'});
        this.closeNameSelector();      
      }else{
        this.setState({numberText: this.state.number + ' Dogs'});
        this.closeNameSelector();
      };
    };
  },

  onEstimateTimeClicked: function(event){
    this.setState({estimateTimeSelected: !this.state.estimateTimeSelected});
    //this.setState({timeSelectDisabled: !this.state.timeSelectDisabled});
    if (this.state.estimateTimeSelected === true){
        this.openTimeSelector();
    }else{
        this.closeTimeSelector();
    };
  },

  onLocationRefresh: function(event){
    console.log('back to location');
    this.setState({
      mapRegion: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      },
    });
    console.log(this.state.mapRegion.latitude);
  },

  onSearchTextChange: function(event){
    this.setState({searchText: event.nativeEvent.text})
  },

  onChosenOne: function(event){
    this.setState({oneClicked: !this.state.oneClicked});
      if (this.state.oneClicked === true){
        this.setState({number: this.state.number+1});
      }else{
        this.setState({number: this.state.number-1});
      };
  },

  onChosenTwo: function(event){
    this.setState({twoClicked: !this.state.twoClicked});
      if (this.state.twoClicked === true){
        this.setState({number: this.state.number+1});
      }else{
        this.setState({number: this.state.number-1});
      };
  },

  onChosenThree: function(event){
    this.setState({threeClicked: !this.state.threeClicked});
      if (this.state.threeClicked === true){
        this.setState({number: this.state.number+1});
      }else{
        this.setState({number: this.state.number-1});
      };
  },

  onChosenFour: function(event){
    this.setState({fourClicked: !this.state.fourClicked});
      if (this.state.fourClicked === true){
        this.setState({number: this.state.number+1});
      }else{
        this.setState({number: this.state.number-1});
      };
  },

  onPressInFirst: function(){
    this.setState({firstClicked: !this.state.firstClicked});
    this.setState({secondClicked: false});
    this.setState({thridClicked: false});
    this.setState({fourthClicked: false});
  },

  onPressOutFirst: function(){
    this.setState({estimateTimeSelected: !this.state.estimateTimeSelected});
    this.setState({timeText: '0.5 Hour'});
  },

  onPressInSecond: function(){
    this.setState({secondClicked: !this.state.secondClicked});
    this.setState({firstClicked: false});
    this.setState({thridClicked: false});
    this.setState({fourthClicked: false});    
  },

  onPressOutSecond: function(){
    this.setState({estimateTimeSelected: !this.state.estimateTimeSelected});
    this.setState({timeText: '1 Hour'});
  },

  onPressInThird: function(){
    this.setState({thridClicked: !this.state.thridClicked});
    this.setState({firstClicked: false});
    this.setState({secondClicked: false});
    this.setState({fourthClicked: false});
  },

  onPressOutThird: function(){
    this.setState({estimateTimeSelected: !this.state.estimateTimeSelected});
    this.setState({timeText: '2 Hours'});
  },

  onPressInForth: function(){
    this.setState({fourthClicked: !this.state.fourthClicked});
    this.setState({firstClicked: false});
    this.setState({thridClicked: false});
    this.setState({secondClicked: false});
  },

  onPressOutForth: function(){
    this.setState({estimateTimeSelected: !this.state.estimateTimeSelected});
    this.setState({timeText: '3 Hours'});
  },

  onPressInCarer: function(event){
    this.setState({shelterColor: 'white'});
    this.setState({carerColor: '#FFC927'});
  },

  onPressInShelter: function(event){
    this.setState({shelterColor: '#FFC927'});
    this.setState({carerColor: 'white'});
  },


  onPressCarer: function(event){
    console.log('to Carer');
    this.setState({carerClicked: !this.state.carerClicked});
    
    Animated.timing(this.state.sliderPosition, {
      toValue: 52.5, 
      duration: 200,
      easing: Easing.linear, 
    }).start();

    Animated.timing(this.state.shelterTextLeft, {
      toValue: -500, 
      duration: 200,
      easing: Easing.linear, 
    }).start();

    Animated.timing(this.state.carerTextLeft, {
      toValue: 100, 
      duration: 200,
      easing: Easing.linear, 
    }).start();

    if ((this.state.carerClicked === false && this.state.descriptionDisplay === 0)){
      this.setState({descriptionDisplay: 1});
      this.setState({shelterClicked: false});
      Animated.timing(this.state.descriptionHeight, {
        toValue: 60, 
        duration: 100,
        easing: Easing.linear, 
      }).start();      
    }else if(this.state.carerClicked === true && this.state.descriptionDisplay === 1){
      this.setState({descriptionDisplay: 0});
      this.setState({shelterClicked: true});
      Animated.timing(this.state.descriptionHeight, {
        toValue: 0, 
        duration: 100,
        easing: Easing.linear, 
      }).start();       
    }else if(this.state.carerClicked === true && this.state.descriptionDisplay === 0){
      this.setState({shelterClicked: true});
    }else if(this.state.carerClicked === false && this. state.descriptionDisplay === 1){
      this.setState({shelterClicked: false});
    };
    
  },

  onPressShelter: function(event){
    console.log('carerClicked' + this.state.carerClicked);
    this.setState({shelterClicked: !this.state.shelterClicked});
    Animated.timing(this.state.sliderPosition, {
        toValue: 202.5, 
        duration: 200,
        easing: Easing.linear, 
    }).start();

    Animated.timing(this.state.shelterTextLeft, {
        toValue: 0, 
        duration: 200,
        easing: Easing.linear, 
    }).start();

    Animated.timing(this.state.carerTextLeft, {
        toValue: 500, 
        duration: 200,
        easing: Easing.linear, 
    }).start();

    if (this.state.shelterClicked === true){
      this.setState({descriptionDisplay: 1});
      this.setState({carerClicked: true});
      Animated.timing(this.state.descriptionHeight, {
        toValue: 60, 
        duration: 100,
        easing: Easing.linear, 
      }).start();   
    }else if(this.state.shelterClicked === false){
      this.setState({descriptionDisplay: 0});
      this.setState({carerClicked: false});
      Animated.timing(this.state.descriptionHeight, {
        toValue: 0, 
        duration: 100,
        easing: Easing.linear, 
      }).start();
    };
    
  },

	render() {
		return( 
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        captureGestures={true}
        content={<ControlPanel closeDrawer={this.closeDrawer}/>}
        //disabled = {true}
        captureGestures = {true}
        onOpen = {this.onDrawerOpen}
        onClose = {this.onDrawerClose}
        panOpenMask = {20}
        openDrawerOffset={0.33}
        panCloseMask={0}
        closedDrawerOffset={0}
        negotiatePan={false}
        style = {styles.drawerStyles}
        acceptTap = {true}
        acceptPan = {true}
        tapToClose={true}
        tweenHandler={(ratio) => ({
          main: {opacity:(2-ratio)/2 }
        })}
        >
      <View style = {styles.container}>
        <MapView
            style={styles.map}
            showsUserLocation={true}
            //followUserLocation={true}
            region = {this.state.mapRegion}
            maxDelta = {0.9}
            onRegionChange = {this.regionChange}
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
          }}>Always Around</Text>
        </View>
        <View style = {styles.selectService}>
          <View style = {{marginTop: 0, marginLeft: 52.5, height: 73}}/>
          <TouchableOpacity style = {styles.serviceButton} 
            activeOpacity = {0.9}
            onPressIn = {this.onPressInCarer}
            onPressOut = {this.onPressOut}
            onPress = {this.onPressCarer}>
            <Text style = {[styles.serviceType, {color: this.state.carerColor}]}>AA Carer</Text>
            <Text style = {[styles.estimatedTime, {color: this.state.carerColor}]}>10 min</Text>
            <Image style = {{height: 35, marginTop: 2,}}
              source = {require('../ios/AA_Carer.png')}/>
          </TouchableOpacity>
          <View style = {{marginTop: 0, marginLeft: 0, height: 73, width: 30}}/>
          <TouchableOpacity style = {styles.serviceButton} 
            activeOpacity = {0.9}
            onPressIn = {this.onPressInShelter}
            onPressOut = {()=>{console.log('hihihi')}}
            onPress = {this.onPressShelter}>
            <Text style = {[styles.serviceType, {color: this.state.shelterColor}]}>AA Shelter</Text>
            <Text style = {[styles.estimatedTime, {color: this.state.shelterColor}]}>10 min</Text>
            <Image style = {{height: 35, marginTop: 2,}}
              source = {require('../ios/AA_Shelter.png')}/>
          </TouchableOpacity>
        </View>
        <Animated.View style = {[styles.description, {height: this.state.descriptionHeight}]}>
          <Animated.Text style = {{
            fontSize: 12,
            fontFamily: 'SanFranciscoDisplay-Regular',
            color: '#B6B6B6',
            marginTop: 8,
            marginLeft: 19,
            backgroundColor: 'transparent',
            opacity: this.state.descriptionDisplay,
          }}>DESCRIPTION</Animated.Text>
          <ScrollView style={{marginTop: 2, marginLeft: 24, height: 10}}>
            <Animated.View style= {{flexDirection: 'row'}}>
              <Animated.Text style = {[styles.descriptionText, {marginLeft: this.state.shelterTextLeft}]}>Designed By LunaBaetylus Studio London.{"\n"}This is AlwaysAround Shelter
              </Animated.Text>
              <Animated.Text style = {[styles.descriptionText, {marginLeft: this.state.carerTextLeft}]}>Designed By LunaBaetylus Studio London.{"\n"}This is AlwaysAround Carer.
              </Animated.Text>
            </Animated.View>
          </ScrollView>
        </Animated.View>
        <Animated.View style = {styles.sliderContainer}>
          <Animated.View style = {[styles.slider, {marginLeft: this.state.sliderPosition}]}>
          </Animated.View>
        </Animated.View>

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

        <TouchableOpacity style = {styles.buttonRefresh}
          onPress = {this.onLocationRefresh}
          activeOpacity = {0.9}
          >
          <Image style = {{
            marginTop: 0,
            width: 32,
            height: 32,
            //opacity: 0.9
            }}
            source = {require('../ios/location.png')}
          />
        </TouchableOpacity>

        <View style = {styles.optionsContainer}>
            <TouchableOpacity style = {styles.selectDogNumber}
                  onPress = {this.onDogNumberClicked}
                  activeOpacity = {0.8}>
                <Image style = {{
                     marginTop: 11,
                     marginLeft: 11, 
                     }} 
                     source = {this.state.dogNumberSelected? require('../ios/down.png'): require('../ios/up.png')}/>
                  <View style={{height: 46, width: 128, justifyContent: 'center', flexDirection: 'column'}}>
                    <Animated.Text style = {[styles.optionText, {color: this.state.optionTextColor}]}>{this.state.numberText}</Animated.Text>
                  </View>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.selectTime} 
              onPress = {this.onEstimateTimeClicked}
              activeOpacity = {0.8}>
              <Image style = {{
                marginLeft: 11,
                marginTop: 11,
                }} 
                source = {this.state.estimateTimeSelected? require('../ios/down.png'): require('../ios/up.png')}/>
              <View style={{height: 46, width: 128, justifyContent: 'center', flexDirection: 'row'}}>
                <Animated.Text style = {styles.optionText}>{this.state.timeText}</Animated.Text>
              </View>
            </TouchableOpacity>
        </View>

        <Animated.View style = {[styles.timeSelectContainer, {height: this.state.timeSelectHeight}, {opacity: this.state.timeSelectOpacity}]}>
          <TouchableOpacity onPress = {this.closeTimeSelector} onPressIn = {this.onPressInFirst} onPressOut = {this.onPressOutFirst}
            activeOpacity={0.9} disabled = {this.state.timeSelectDisabled}>
            <View style = {styles.timeOptionContainer}>
              <View style = {[styles.checkBoxBorder, {backgroundColor: this.state.firstClicked? '#62C6C6':'transparent'}]}>
                <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                  source = {require('../ios/uncheck_green.png')}/>
              </View>
              <Text style ={[styles.timeOptionText, {paddingTop: -2}]}>0:30</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress = {this.closeTimeSelector} onPressIn = {this.onPressInSecond} onPressOut = {this.onPressOutSecond}
            activeOpacity={0.9} disabled = {this.state.timeSelectDisabled}>
            <View style = {styles.timeOptionContainer}>
              <View style = {[styles.checkBoxBorder, {backgroundColor: this.state.secondClicked? '#62C6C6':'transparent'}]}>
                <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                  source = {require('../ios/uncheck_green.png')}/>
              </View>
              <Text style ={[styles.timeOptionText, {paddingTop: -2}]}> 1:00</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress = {this.closeTimeSelector} onPressIn = {this.onPressInThird} onPressOut = {this.onPressOutThird}
            activeOpacity={0.9} disabled = {this.state.timeSelectDisabled}>
            <View style = {styles.timeOptionContainer}>
              <View style = {[styles.checkBoxBorder, {backgroundColor: this.state.thridClicked? '#62C6C6':'transparent'}]}>
                <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                  source = {require('../ios/uncheck_green.png')}/>
              </View>
              <Text style ={[styles.timeOptionText, {paddingTop: -2}]}>2:00</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress = {this.closeTimeSelector} onPressIn = {this.onPressInForth} onPressOut = {this.onPressOutForth}
            activeOpacity={0.9} disabled = {this.state.timeSelectDisabled}>
            <View style = {styles.timeOptionContainer}>
              <View style = {[styles.checkBoxBorder, {backgroundColor: this.state.fourthClicked? '#62C6C6':'transparent'}]}>
                <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                  source = {require('../ios/uncheck_green.png')}/>
              </View>
              <Text style ={[styles.timeOptionText, {paddingTop: -2}]}>3:00</Text>
            </View>
          </TouchableOpacity>
          <View style = {{height: 12, backgroundColor: 'transparent'}}/>
        </Animated.View>

        <Animated.View style = {[styles.numberSelectContainer, {height: this.state.numberSelectHeight}, {opacity: this.state.numberOpacity}]}>
          <TouchableOpacity style = {{backgroundColor: 'transparent'}} onPress = {this.onChosenOne} 
            activeOpacity={0.9} disabled = {this.state.numberSelectDisabled}>
            <View style = {styles.nameOptionContainer}>
              <View style = {[styles.checkBoxBorder, {backgroundColor: this.state.oneClicked? '#62C6C6':'transparent'}]}>
                <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                  source = {require('../ios/uncheck_green.png')}/>
              </View>
              <Text style ={[styles.timeOptionText, {paddingTop: -3}]}>LunaBaetylus</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style = {{backgroundColor:'transparent'}} onPress = {this.onChosenTwo} 
            activeOpacity={0.9} underlayColor = {'transparent'} disabled = {this.state.numberSelectDisabled}>
            <View style = {styles.nameOptionContainer}>
              <View style = {[styles.checkBoxBorder, {backgroundColor: this.state.twoClicked? '#62C6C6':'transparent'}]}>
                <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                  source = {require('../ios/uncheck_green.png')}/>
              </View>
              <Text style ={[styles.timeOptionText, {paddingTop: -2}]}>Yiran Tao</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style = {{backgroundColor: 'transparent'}} onPress = {this.onChosenThree} 
            activeOpacity={0.9} underlayColor = {'#CCCCCC'} disabled = {this.state.numberSelectDisabled}>
            <View style = {styles.nameOptionContainer}>
              <View style = {[styles.checkBoxBorder, {backgroundColor: this.state.threeClicked? '#62C6C6':'transparent'}]}>
                <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                  source = {require('../ios/uncheck_green.png')}/>
              </View>
              <Text style ={[styles.timeOptionText, {paddingTop: -2.5}]}>Shibo Wang</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style = {{backgroundColor:'transparent'}} onPress = {this.onChosenFour} 
            activeOpacity={0.9} underlayColor = {'#CCCCCC'} disabled = {this.state.numberSelectDisabled}>
            <View style = {styles.nameOptionContainer}>
              <View style = {[styles.checkBoxBorder, {backgroundColor: this.state.fourClicked? '#62C6C6':'transparent'}]}>
                <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                  source = {require('../ios/uncheck_green.png')}/>
              </View>
              <Text style ={[styles.timeOptionText, {paddingTop: -2.5}]}>Peking Wang</Text>
            </View>
          </TouchableOpacity>
          <View style = {{height: 12, backgroundColor: 'transparent'}}/>
        </Animated.View>

        <View style = {styles.pickUpPadding}/>

        <View style = {styles.pickUpLocationContainer}>
          <TouchableOpacity style = {{marginLeft: 0, marginTop: 0, height: 34, flexDirection: 'row', alignItems: 'center'}} activeOpacity = {1.0}
            onPress = {Actions.search}>
            <Image style = {{marginLeft: 0 , width: 20, height: 20, resizeMode: 'stretch', opacity: 0.8}}
                source = {require('../ios/Oval.png')}/>
            <View style = {{marginTop: 0, marginLeft: -40, width: 375, height: 34}}>
              <Text style = {{
                marginTop: 5, 
                //marginLeft: 97,
                textAlign: 'center', 
                fontSize: 20,
                fontFamily: 'SanFranciscoDisplay-Regular',
                color: '#727272',
                backgroundColor: 'transparent'
                }}>{this.state.locationText}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style = {styles.pickUpButton} opacity = {0.9}>
          <Image style = {{marginTop: 5, marginLeft: 0, width: 337, opacity: 0.9}}
            source = {require('../ios/pick_up.png')}/>
        </TouchableOpacity>
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
    height: 91,
    flexDirection: 'row',
    opacity: 0.95,
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

  description: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 150,
    left: 0,
    right: 0,
    opacity: 0.8,
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5},
    flexDirection: 'column',
  },

  serviceButton: {
    marginTop: 0,
    marginLeft: 0,
    height: 87,
    width: 120,
    backgroundColor: '#EA4D4E',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.95,
  },

  sliderContainer: {
    position: 'absolute',
    top: 145,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: '#EA4D4E',
    flexDirection: 'row',
    shadowRadius: 0.5,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.6},
    opacity: 0.95
  },

  slider: {
    marginTop: 0,
    backgroundColor: '#FFC927',
    width: 120,
    height: 5,
  },

  descriptionText: {
    fontSize: 12,
    fontFamily: 'SanFranciscoDisplay-Regular',
    color: '#727272',
    paddingTop: 0,
    //height: 20,
    width: 400,
    //marginLeft: 0,
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

  drawerStyles:{
    shadowColor: 'black', 
    shadowOpacity: 0.8, 
    shadowRadius: 3,
    //backgroundColor: 'black'
    //shadowOffset:{x: 10, y: 0}
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
    backgroundColor: '#EA4D4E',
  },

  avatarContainer:{
    backgroundColor: '#F68B8B',
    //alignItems: 'center',
    height: 90,
    marginTop: 0,
    marginLeft: 0,
    flexDirection: 'row'

  },

  avatar:{
    marginTop: 20,
    marginLeft: 15,
    width: 50,
    height: 50,
    borderRadius: 50/2,
  },

  drawerButtons:{
    marginLeft: 0,
    height: 50,
    backgroundColor: '#EA4D4E'
  },

  menuItem:{
    marginLeft: 18,
    //marginTop: 34,
    fontSize: 18,
    fontFamily: 'SanFranciscoDisplay-Medium',
    color: 'white'
  },

  buttonClose:{
    marginTop: 20,
    marginLeft: 15,
    height: 20,
    width: 20,
  },

  textInputBG: {
    marginTop : 16,
    borderRadius: 2,
    height: 35,
    backgroundColor: 'white',
    shadowRadius: 0.1,
    shadowOpacity: 0.5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    flex: 1
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
    bottom: 166,
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
  },

  buttonSetPickUp:{
    position: 'absolute',
    bottom: 10,
    left: 19,
    right: 19,
    height: 46,
    //width: 337,
    borderRadius: 6,
    backgroundColor: '#EA4D4E',
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowColor: 'gray',
    shadowOffset: {width: 1, height: 1} 
  },

  optionsContainer:{
    position: 'absolute',
    bottom: 110,
    right: 19,
    left: 19,
    height: 46,
    backgroundColor: 'transparent',
    //backgroundColor: 'white',
    flexDirection: 'row'
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

  numberSelectContainer:{
    position: 'absolute',
    left: 19,
    bottom: 166,
    width: 140,
    backgroundColor: 'white',
    borderRadius: 6,
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    flexDirection: 'column',
    justifyContent: 'space-around',
    opacity: 0.8
  }, 

  timeSelectContainer:{
    position: 'absolute',
    left: 193,
    bottom: 166,
    width: 80,
    //height: 120,
    borderRadius: 6,
    backgroundColor: 'white',
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    flexDirection: 'column',
    justifyContent: 'space-around',
    opacity: 0.8
  },

  selectDogNumber:{
    marginTop: 0,
    marginLeft: 0,
    borderRadius: 6,
    backgroundColor: 'white',
    width: 163,
    flexDirection: 'row',
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0}, 
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.8
  },

  selectTime:{
    marginLeft: 11,
    marginTop: 0,
    borderRadius: 6,
    backgroundColor: 'white',
    width: 163,
    flexDirection:'row',
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    justifyContent: 'center',
    opacity: 0.8
  },

  optionText:{
    //marginTop: 13,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#727272',
    fontSize: 18,
    fontFamily: 'SanFranciscoDisplay-Regular',
    backgroundColor: 'transparent',
  },

  timeOptionContainer:{
    height: 28, 
    width: 70, 
    borderRadius: 6, 
    //backgroundColor: 'red', 
    //justifyContent: 'center',
    flexDirection: 'row'
  },

  timeOptionText:{
    marginLeft: 6,
    //textAlign: 'center', 
    fontSize: 16,
    marginTop: 12, 
    fontFamily: 'SanFranciscoDisplay-Regular', 
    color: '#727272',
    flexDirection: 'row'
  },

  nameOptionContainer:{
    height: 28, 
    width: 140, 
    borderRadius: 6, 
    //backgroundColor: 'red', 
    //justifyContent: 'center',
    flexDirection: 'row'
  },

  checkBoxBorder: {
    marginTop: 12, 
    marginLeft: 8, 
    height: 16, 
    width: 16, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#62C6C6',
    justifyContent: 'center',
    alignItems: 'center'
  }

});

module.exports = MainPage;