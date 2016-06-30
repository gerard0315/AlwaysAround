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
      numberText: 'Select Dog',
      numberSelected: false,
      timeText: 'Time Estimate',
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
      optionTextColor: '#646464',

      carerColor: 'white',
      shelterColor: '#FCC31B',
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
    //StatusBar.setHidden(false, null);
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
    Animated.timing(this.state.numberSelectHeight, {
      toValue: 120, 
      duration: 120,
          //delay: ,
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
    Animated.timing(this.state.timeSelectHeight, {
      toValue: 120, 
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
    Animated.timing(this.state.timeSelectHeight, {
      toValue: 0, 
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

  onChosenFirst: function(){
    this.setState({estimateTimeSelected: !this.state.estimateTimeSelected});
    this.setState({timeText: '0.5 Hour'});
    this.closeTimeSelector();
  },

  onChosenSecond: function(){
    this.setState({estimateTimeSelected: !this.state.estimateTimeSelected});
    this.setState({timeText: '1 Hour'});
    this.closeTimeSelector();
  },

  onChosenThird: function(){
    this.setState({estimateTimeSelected: !this.state.estimateTimeSelected});
    this.setState({timeText: '2 Hours'});
    this.closeTimeSelector();
  },

  onChosenFourth: function(){
    this.setState({estimateTimeSelected: !this.state.estimateTimeSelected});
    this.setState({timeText: '3 Hours'});
    this.closeTimeSelector();
  },

  onPressInCarer: function(event){
    this.setState({shelterColor: 'white'});
    this.setState({carerColor: '#FCC31B'});
  },

  onPressInShelter: function(event){
    this.setState({shelterColor: '#FCC31B'});
    this.setState({carerColor: 'white'});
  },


  onPressCarer: function(event){
    console.log('to Carer');
    this.setState({carerClicked: !this.state.carerClicked});
    
    Animated.timing(this.state.sliderPosition, {
      toValue: 52.5, // 目标值
      duration: 200,
      easing: Easing.linear, // 动画时间
    }).start();

    Animated.timing(this.state.shelterTextLeft, {
      toValue: -500, // 目标值
      duration: 200,
      easing: Easing.linear, // 动画时间
    }).start();

    Animated.timing(this.state.carerTextLeft, {
      toValue: 100, // 目标值
      duration: 200,
      easing: Easing.linear, // 动画时间
    }).start();

    if ((this.state.carerClicked === false && this.state.descriptionDisplay === 0)){
      this.setState({descriptionDisplay: 1});
      this.setState({shelterClicked: false});
      Animated.timing(this.state.descriptionHeight, {
        toValue: 60, // 目标值
        duration: 100,
        easing: Easing.linear, // 动画时间
      }).start();      
    }else if(this.state.carerClicked === true && this.state.descriptionDisplay === 1){
      this.setState({descriptionDisplay: 0});
      this.setState({shelterClicked: true});
      Animated.timing(this.state.descriptionHeight, {
        toValue: 0, // 目标值
        duration: 100,
        easing: Easing.linear, // 动画时间
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
        toValue: 202.5, // 目标值
        duration: 200,
        easing: Easing.linear, // 动画时间
    }).start();

    Animated.timing(this.state.shelterTextLeft, {
        toValue: 0, // 目标值
        duration: 200,
        easing: Easing.linear, // 动画时间
    }).start();

    Animated.timing(this.state.carerTextLeft, {
        toValue: 500, // 目标值
        duration: 200,
        easing: Easing.linear, // 动画时间
    }).start();

    if (this.state.shelterClicked === true){
      this.setState({descriptionDisplay: 1});
      this.setState({carerClicked: true});
      Animated.timing(this.state.descriptionHeight, {
        toValue: 60, // 目标值
        duration: 100,
        easing: Easing.linear, // 动画时间
      }).start();   
    }else if(this.state.shelterClicked === false){
      this.setState({descriptionDisplay: 0});
      this.setState({carerClicked: false});
      Animated.timing(this.state.descriptionHeight, {
        toValue: 0, // 目标值
        duration: 100,
        easing: Easing.linear, // 动画时间
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
        openDrawerOffset={0.33} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={0}
        negotiatePan={false}
        style = {styles.drawerStyles}
        acceptTap = {true}
        acceptPan = {true}
        tapToClose={true}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
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
              marginLeft: 92,
              color: 'white',
              fontSize: 18,
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
            color: '#949494',
            marginTop: 10,
            marginLeft: 19,
            backgroundColor: 'transparent',
            opacity: this.state.descriptionDisplay,
          }}>Description</Animated.Text>
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
            width: 38,
            height: 38
            }}
            source = {require('../ios/location.png')}
          />
        </TouchableOpacity>

        <View style = {styles.optionsContainer}>
            <TouchableOpacity style = {styles.selectDogNumber}
                  onPress = {this.onDogNumberClicked}
                  activeOpacity = {0.9}>
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
              activeOpacity = {0.9}>
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
          <TouchableHighlight onPress = {this.onChosenFirst} activeOpacity={0.1} underlayColor = {'#999999'}>
            <View style = {styles.timeOptionContainer}>
              <Text style ={styles.timeOptionText}>0:30</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress = {this.onChosenSecond} activeOpacity={0.1} underlayColor = {'#999999'}>
            <View style = {styles.timeOptionContainer}>
              <Text style ={styles.timeOptionText}>1:00</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress = {this.onChosenThird} activeOpacity={0.1} underlayColor = {'#999999'}>
            <View style = {styles.timeOptionContainer}>
              <Text style ={styles.timeOptionText}>2:00</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress = {this.onChosenFourth} activeOpacity={0.1} underlayColor = {'#999999'}>
            <View style = {styles.timeOptionContainer}>
              <Text style ={styles.timeOptionText}>3:00</Text>
            </View>
          </TouchableHighlight>
        </Animated.View>

        <Animated.View style = {[styles.numberSelectContainer,
          {height: this.state.numberSelectHeight}, {opacity: this.state.numberOpacity}]}>
          <TouchableHighlight style = {{backgroundColor: this.state.oneClicked? '#E0E0E0' : 'transparent'}} onPress = {this.onChosenOne} activeOpacity={0.1} underlayColor = {'#CCCCCC'}>
            <View style = {styles.nameOptionContainer}>
              <Text style ={styles.timeOptionText}>LunaBaetylus</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style = {{backgroundColor: this.state.twoClicked? '#E0E0E0' : 'transparent'}} onPress = {this.onChosenTwo} activeOpacity={0.1} underlayColor = {'#CCCCCC'}>
            <View style = {styles.nameOptionContainer}>
              <Text style ={styles.timeOptionText}>Yiran Tao</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style = {{backgroundColor: this.state.threeClicked? '#E0E0E0' : 'transparent'}} onPress = {this.onChosenThree} activeOpacity={0.1} underlayColor = {'#CCCCCC'}>
            <View style = {styles.nameOptionContainer}>
              <Text style ={styles.timeOptionText}>Shibo Wang</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style = {{backgroundColor: this.state.fourClicked? '#E0E0E0' : 'transparent'}} onPress = {this.onChosenFour} activeOpacity={0.1} underlayColor = {'#CCCCCC'}>
            <View style = {styles.nameOptionContainer}>
              <Text style ={styles.timeOptionText}>Peking Wang</Text>
            </View>
          </TouchableHighlight>
        </Animated.View>

        <View style = {styles.pickUpPadding}/>

        <View style = {styles.pickUpLocationContainer}>
          <TouchableOpacity style = {{marginLeft: 0, marginTop: 0, height: 34, flexDirection: 'row'}} activeOpacity = {1.0}
            onPress = {Actions.search}>
            <Image style = {{marginLeft: 0, marginTop: 9, height: 20, resizeMode: 'stretch'}}
                source = {require('../ios/Oval.png')}/>
            <View style = {{marginTop: 0, marginLeft: -40, width: 375, height: 34}}>
              <Text style = {{
                marginTop: 5, 
                //marginLeft: 97,
                textAlign: 'center', 
                fontSize: 20,
                fontFamily: 'SanFranciscoDisplay-Regular',
                color: '#646464',
                backgroundColor: 'transparent'
                }}>{this.state.locationText}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style = {styles.pickUpButton} opacity = {0.9}>
          <Image style = {{marginTop: 5, marginLeft: 0, width: 337}}
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
    height: 51,
    flexDirection:'row',
    opacity: 0.9
  },

  selectService:{
    position: 'absolute',
    backgroundColor: '#EA4D4E',
    top: 51,
    left: 0,
    right: 0,
    height: 87,
    flexDirection: 'row',
    opacity: 0.9,
  },

  serviceType: {
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Medium',
    textAlign: 'center',
    marginTop: 10,
  },

  estimatedTime: {
    fontSize: 12,
    fontFamily: 'SanFranciscoDisplay-Regular',
    textAlign: 'center'
  },

  description: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 143,
    left: 0,
    right: 0,
    opacity: 0.8,
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
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
    opacity: 0.9,
  },

  sliderContainer: {
    position: 'absolute',
    top: 138,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: '#EA4D4E',
    flexDirection: 'row',
    shadowRadius: 0.5,
    shadowOpacity: 0.5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 1},
    opacity: 0.9
  },

  slider: {
    marginTop: 0,
    backgroundColor: '#FCC31B',
    width: 120,
    height: 5,
  },

  descriptionText: {
    fontSize: 12,
    fontFamily: 'SanFranciscoDisplay-Regular',
    color: '#646464',
    marginTop: 2,
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
    
    marginTop:36,
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
    shadowOpacity: 0.8, 
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
    top: 567,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'white',
    opacity: 0.8,
    flexDirection: 'column',
    shadowRadius: 0.5,
    shadowOpacity: 0.5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: -0.5}
  },

  pickUpLocationContainer:{
    position: 'absolute',
    top: 567,
    left: 19,
    right: 19,
    height: 34,
    //backgroundColor: 'white'

  },

  pickUpButton: {
    position: 'absolute',
    top: 597,
    left: 19,
    right: 19,
    height: 70,
    //backgroundColor: 'white'
  },

  numberSelectContainer:{
    position: 'absolute',
    left: 19,
    bottom: 166,
    //height: 120,
    //marginLeft: 19,
    //marginTop: 425,
    width: 130,
    height: 120,
    backgroundColor: 'white',
    //borderRadius: 6,
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    flexDirection: 'column',
    justifyContent: 'space-around'
  }, 

  timeSelectContainer:{
    position: 'absolute',
    left: 193,
    bottom: 166,
    width: 69,
    height: 120,
    backgroundColor: 'white',
    shadowRadius: 1,
    shadowOpacity: 0.5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    flexDirection: 'column',
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
    shadowOffset: {width: 0, height: 2}, 
    flexDirection: 'row'
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

  optionText:{
    //marginTop: 13,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#646464',
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Regular',
    backgroundColor: 'transparent',
  },

  timeOptionContainer:{
    height: 30, 
    width: 69, 
    borderRadius: 6, 
    backgroundColor: 'transparent', 
    justifyContent: 'center'
  },

  timeOptionText:{
    textAlign: 'center', 
    fontSize: 16, 
    fontFamily: 'SanFranciscoDisplay-Regular', 
    color: '#646464',
  },

  nameOptionContainer:{
    height: 30, 
    width: 130, 
    borderRadius: 6, 
    backgroundColor: 'transparent', 
    justifyContent: 'center'
  },


});

module.exports = MainPage;