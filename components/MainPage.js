'use strict';
import {Actions} from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
import MapView from 'react-native-maps';
import React, {Component, propTypes} from 'react';
import ControlPanel from './Drawer.js';
import Qs from 'qs';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
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
  AlertIOS
} from 'react-native';

exports.framework = 'React';
var key = 'AIzaSyBOsVygPS8F4LxR87UUMEMZ-PRx-7Erx7g';
var src = "https://maps.googleapis.com/maps/api/js?key=" + key+ "&libraries=places";

var selected = [];
var pets = [];
var {height, width} = Dimensions.get('window');

var MainPage = React.createClass({
  watchID: (null: ?number),

  getDefaultProps: function() {
    return {
        data: null,
        serviceMapRegion: null,
    };
  },

  propTypes: {
      data: React.PropTypes.object,
  },

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
      descriptionOpacity: 0,

      sliderPosition: new Animated.Value(202.5),
      carerTextLeft: new Animated.Value(400),
      shelterTextLeft: new Animated.Value(0),
      descriptionDisplay: 0,
      descriptionHeight: new Animated.Value(0),
      shelterClicked : false,
      onShelter: true,
      carerClicked: false,
      //onCarer: false,

      drawerClosed: true,
      showMap: false,

      latitude: 0,
      longitude: 0,
      //dogNumber: 0,
      timeEstimation: 0,
      dogNumberSelected: false,
      estimateTimeSelected: false,

      mapRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,

      },
      
      userLocation:{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,       
      },

      number: 0,
      time: '',
      //click: false,
      chosenOne: false,
      chosenTwo: false,
      chosenThree: false,
      chosenFour: false,
      firstClicked: false,
      secondClicked: false,
      thridClicked: false,
      fourthClicked: false,
      optionTextColor: '#727272',
      timeChosen: 0,

      petOne: false,
      petTwo: false,
      petThree: false,
      petFour: false,

      carerColor: 'white',
      shelterColor: '#FFC927',
      locationText: null,
      isLoading: true,

      userFirstName: '',
      petNumber: 0,
      pet: [],
    };
  },

  componentWillMount: function(){
    StatusBar.setHidden(false, null);
    storage.load({
        key: 'dogslist',
        autoSync: true,
          syncInBackground: true,
          }).then(ret => {
            console.log(ret.dogs.length);
            this.setState({petNumber: ret.dogs.length});
            if(ret.dogs.length === 0){
              pets = ret.dogs;
              this.setState({pet: [false, false, false, false]});
            }else if(ret.dogs.length === 1){
              pets = ret.dogs;
              this.setState({pet: [true, false, false, false]});
            }else if(ret.dogs.length === 2){
              pets = ret.dogs;
              this.setState({pet: [true, true, false, false]});
            }else if(ret.dogs.length === 3){
              pets = ret.dogs;
              this.setState({pet: [true, true, true, false]});
            }else if(ret.dogs.length === 4){
              pets = ret.dogs;
              this.setState({pet: [true, true, true, false]});
            };

          }).catch(err => {
            console.log("error caught")
            console.warn("this is error message: " + err.message);
          }).done();

  },

  componentDidMount: function() {
    //console.log("IN MAIN PAGE "+ this.props.data.token)
    StatusBar.setHidden(false, null);
    this.timer = setTimeout(
      () => {     
          navigator.geolocation.getCurrentPosition(
            (position) => {
              var initialPosition = JSON.stringify(position);
              this.setState({initialPosition});
              //console.log(initialPosition);
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
            
            this.setState({
              
              mapRegion:{
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              },
            });

            this.setState({userLocation: this.state.mapRegion})
            
            if(this.state.mapRegion.longitude != 0){
              //console.log("in willmount");
              this._requestNearby();
            }else{
              //console.log('getting ready!!');
            }
            
          });
      },
      1000
    );

    this.timer = setTimeout(
      () => { 
        this.setState({showMap: true});
        this.setState({drawerClosed: false});
      }, 
      300);
    navigator.geolocation.clearWatch(this.watchID);
    //console.log("stored pets list: " + this.state.petNumber);

    //this.setState({button: temp});
  },

  _requestNearby: function(){
    this.setState({ isLoading: true});
    this.setState({locationText: ''});
    var _request = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.state.mapRegion.latitude + "," + this.state.mapRegion.longitude + "&result_type=street_address&key=AIzaSyBOsVygPS8F4LxR87UUMEMZ-PRx-7Erx7g";
    //console.log(_request);
    fetch(_request, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
          //console.log(typeof responseData.results[0] === "undefined");
          
          if(typeof responseData.results[0] === "undefined"){
            //console.log('no data');
            this.setState({ isLoading: true});
            this.setState({locationText: ''});
          }else if(typeof responseData.results[0] === "object"){
            var address = responseData.results[0].formatted_address;
            var _add = address.split(", ");
            this.setState({locationText: _add[0]});
            this.setState({ isLoading: false});
          };
          
        })
        .done();
  },


  onRegionChangeComplete: function(region){
    this.setState({ isLoading: true});
    this.setState({locationText: ''});
    var _request = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + region.latitude + "," + region.longitude + "&result_type=street_address&key=AIzaSyBOsVygPS8F4LxR87UUMEMZ-PRx-7Erx7g";
    //console.log(_request);
    fetch(_request, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
          //console.log(typeof responseData.results[0] === "undefined");
          
          if(typeof responseData.results[0] === "undefined"){
            //console.log('error!!');
            this.setState({ isLoading: true});
            this.setState({locationText: ''});
          }else if(typeof responseData.results[0] === "object"){
            var address = responseData.results[0].formatted_address;
            var _add = address.split(", ");
            this.setState({locationText: _add[0]});
            this.setState({ isLoading: false});
          };
          
        })
        .done();
    this.setState({
      mapRegion: {
        longitude: region.longitude,
        latitude: region.latitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      },
    });

  },

  renderMap: function() {
      if (this.state.showMap) {
        return (
        <MapView
            style={styles.map}
            showsUserLocation={true}
            region = {this.state.mapRegion}
            maxDelta = {0.9}
            onRegionChange = {this.regionChange}
            onRegionChangeComplete = {this.onRegionChangeComplete}
            loadingIndicatorColor="#666666"
            loadingBackgroundColor="#eeeeee"
          />
        );
      } else {
        return (
          <View style={[styles.map, {backgroundColor: '#AEE1F5'}]} />
        );
      }
  },


  componentWillUnmount: function() {
    this.setState({drawerClosed: true});
    this.setState({firstClicked: false});
    this.setState({secondClicked: false});
    this.setState({thridClicked: false});
    this.setState({fourthClicked: false});
    //this.setState({button: [fal]});

    selected = [];
    console.log('unmountinggggggggggggggggggg');
    navigator.geolocation.clearWatch(this.watchID);
    this.setState({numberSelectHeight: 0});
    this._drawer.close();
    this.timer && clearTimeout(this.timer);
    StatusBar.setHidden(false, null);
  },


  openDrawer: function(){
    this._drawer.open()
    console.log('openDrawer');
  },

  onDrawerOpen: function(event){
  this.timer = setTimeout(
      () => {
    StatusBar.setHidden(true, null);
  }, 10);
  },

  onDrawerClose: function(event){
  this.timer = setTimeout(
      () => {
    StatusBar.setHidden(false, null);
  }, 10);
  },

  closeDrawer: function(){
    this._drawer.close();
    //StatusBar.setHidden(false, null);
    console.log('closeDrawer');
  },

  _checkForEmpty: function(){
    console.log(selected);
    for (var i = 0; i < selected.length; i++){
      if (selected[i] === ' '){
        selected.splice(i, 1);
      }
    }
  },

  regionChange: function(region){
    this.setState({mapRegion: region});

    this.setState({ isLoading: true});
    this.setState({locationText: ''});
  },

  openNameSelector: function(event){
      Animated.timing(this.state.numberSelectHeight, {
        toValue: (this.state.petNumber) * 28 + 12, 
        duration: 150,
        easing: Easing.linear,
      }).start();

      Animated.timing(this.state.numberOpacity, {
        toValue: 0.8, // 目标值
        duration: 20,
        delay: 80,
        easing: Easing.linear, // 动画时间
      }).start();
  },

  closeNameSelector: function(event){
    //this.setState({numberSelectDisabled: false});
    //console.log("selector closed" + this.state.numberSelectDisabled);
    Animated.timing(this.state.numberSelectHeight, {
      toValue: 0, 
      duration: 120,
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
      toValue: 0.8, // 目标值
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
    if (this.state.dogNumberSelected === false){
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
    if (this.state.estimateTimeSelected === false){
        this.openTimeSelector();
    }else{
        this.closeTimeSelector();
    };
  },

  onLocationRefresh: function(event){
    console.log('back to location');
    this.setState({
      mapRegion: this.state.userLocation
    });
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
    this.setState({timeChosen: 0.5});
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
    this.setState({timeChosen: 1});
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
    this.setState({timeChosen: 2});
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
    this.setState({timeChosen: 3});
  },

  deleteName: function(name){
    for (var i = 0; i < selected.length; i++){
      if (selected[i] === name){
        selected.splice(i, 1);
        console.log(selected);
        }
    };
  },


  onChosenOne: function(name){
    this._checkForEmpty();
      if (this.state.chosenOne === false){
        this.setState({number: this.state.number+1});
        this.setState({chosenOne: true});
        selected.push(name);
      }else{
        this.setState({chosenOne: false});
        this.setState({number: this.state.number-1});
      };
  },

  onChosenTwo: function(name){
    this._checkForEmpty();
      if (this.state.chosenTwo === false){
        this.setState({number: this.state.number+1});
        this.setState({chosenTwo: true});
        selected.push(name);
      }else{
        this.setState({chosenTwo: false});
        this.setState({number: this.state.number-1});
        this.deleteName(name);
      };
  },

  onChosenThree: function(name){
    this._checkForEmpty();
      if (this.state.chosenThree === false){
        this.setState({number: this.state.number+1});
        this.setState({chosenThree: true});
        selected.push(name);
      }else{
        this.setState({chosenThree: false});
        this.setState({number: this.state.number-1});
        this.deleteName(name);
      };
  },

  onChosenFour: function(name){
    this._checkForEmpty();
      if (this.state.chosenFour === false){
        this.setState({number: this.state.number+1});
        this.setState({chosenFour: true});
        selected.push(name);
      }else{
        this.setState({number: this.state.number-1});
        this.setState({chosenFour: false});
        this.deleteName(name);
      };
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

    this.setState({shelterClicked: false});
    if (this.state.carerClicked === false && this.state.onShelter === true){
      this.setState({carerClicked: true});
      this.setState({onShelter: false});
    }else if(this.state.carerClicked === true && this.state.onShelter === false){
      this.setState({carerClicked: false});
      this.setState({onShelter: false});
      if (this.state.descriptionDisplay === 1){
        this.foldDescription();
      }else if(this.state.descriptionDisplay === 0){
        this.displayDescription();
      }
    }else if(this.state.carerClicked === false && this.state.onShelter === false){
      this.setState({carerClicked: true});
      this.setState({onShelter: false});
      if (this.state.descriptionDisplay === 1){
        this.foldDescription();
      }else if(this.state.descriptionDisplay === 0){
        this.displayDescription();
      }
    }
   
  },

  onPressShelter: function(event){    
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

    this.setState({carerClicked: false});
    if (this.state.shelterClicked === false && this.state.onShelter === true){
      this.setState({shelterClicked: true});
      if (this.state.descriptionDisplay === 1){
        this.foldDescription();
      }else if(this.state.descriptionDisplay === 0){
        this.displayDescription();
      }
    }else if(this.state.shelterClicked === true && this.state.onShelter === true){
      this.setState({shelterClicked: false});
      if (this.state.descriptionDisplay === 1){
        this.foldDescription();
      }else if(this.state.descriptionDisplay === 0){
        this.displayDescription();
      }
    }else if(this.state.onShelter === false){
      this.setState({onShelter: true});
    }
    
  },

  displayDescription: function(){
    this.setState({descriptionDisplay: 1});
    Animated.timing(this.state.descriptionHeight, {
        toValue: 60, 
        duration: 100,
        easing: Easing.linear, 
    }).start(); 
  },

  foldDescription: function(){
    this.setState({descriptionDisplay: 0});
    Animated.timing(this.state.descriptionHeight, {
        toValue: 0, 
        duration: 100,
        easing: Easing.linear, 
    }).start();   
  },

  onPressSearch: function(){
    Actions.search({lng: this.state.mapRegion.longitude, lat: this.state.mapRegion.latitude});
    navigator.geolocation.clearWatch(this.watchID);
    //this.setState({numberSelectHeight: 0});
    //this.setState({drawerClosed: true});
    //this._drawer.close();
    this.timer && clearTimeout(this.timer);
  },

  onPressPickUp: function(){
    if (selected.length === 0 || this.state.timeChosen === 0){
      AlertIOS.alert(
        'Service info not completed!',
        'Please check selected dogs and time!'
      );
    }else{
      console.log(this.state.button);
      Actions.confirm({
        lat: this.state.mapRegion.latitude, 
        lng: this.state.mapRegion.longitude, 
        location: this.state.locationText, 
        service: {onShelter: this.state.onShelter, time: 10}, 
        infoData: selected, 
        time: this.state.timeChosen,
        paymentType: 2});
    }
  },

  render() {
    return( 
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        captureGestures={true}
        content={<ControlPanel closeDrawer={this.closeDrawer} data = {this.props.data}/>}
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
        {this.renderMap()}
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
              <Animated.Text style = {[styles.descriptionText, {marginLeft: this.state.shelterTextLeft, opacity: this.state.descriptionDisplay}]}>Designed By LunaBaetylus Studio London.{"\n"}This is AlwaysAround Shelter
              </Animated.Text>
              <Animated.Text style = {[styles.descriptionText, {marginLeft: this.state.carerTextLeft, opacity: this.state.descriptionDisplay}]}>Designed By LunaBaetylus Studio London.{"\n"}This is AlwaysAround Carer.
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
            <View style = {styles.selectDogNumber}>
              <TouchableOpacity style = {{flexDirection : 'row'}}
                  onPress = {this.onDogNumberClicked}
                  activeOpacity = {1}>
                <Image style = {{
                     marginTop: 11,
                     marginLeft: 11, 
                     }} 
                     source = {this.state.dogNumberSelected? require('../ios/down.png'): require('../ios/up.png')}/>
                  <View style={{height: 46, width: 128, justifyContent: 'center', flexDirection: 'column'}}>
                    <Text style = {[styles.optionText, {color: this.state.optionTextColor}]}>{this.state.numberText}</Text>
                  </View>
              </TouchableOpacity>
            </View>
            <View style = {styles.selectTime} >
              <TouchableOpacity style = {{flexDirection : 'row'}}
                onPress = {this.onEstimateTimeClicked}
                activeOpacity = {1}>
                <Image style = {{
                  marginLeft: 11,
                  marginTop: 11,
                  }} 
                  source = {this.state.estimateTimeSelected? require('../ios/down.png'): require('../ios/up.png')}/>
                <View style={{height: 46, width: 128, justifyContent: 'center', flexDirection: 'row'}}>
                  <Text style = {styles.optionText}>{this.state.timeText}</Text>
                </View>
              </TouchableOpacity>
            </View>
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
          { this.state.pet[0] ? 
            (<View style = {{borderRadius: 6, height: 28, width: 140}} >
              <TouchableOpacity onPress = {this.onChosenOne.bind(null, pets[0].basic.name)} activeOpacity={0.9} underlayColor = {'#CCCCCC'} >
              <View style = {styles.nameOptionContainer}>
                <View style = {[styles.checkBoxBorderName, {backgroundColor: this.state.chosenOne? '#62C6C6': 'transparent'}]}>
                    <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                      source = {require('../ios/uncheck_green.png')}/>
                </View>     
                <Text style ={styles.nameOptionText}>{pets[0].basic.name}</Text>
              </View>
            </TouchableOpacity>    
          </View>) : null         
        }
        {this.state.pet[1] ? 
          (<View style = {{borderRadius: 6, height: 28, width: 140}} >
              <TouchableOpacity onPress = {this.onChosenTwo.bind(null, pets[1].basic.name)} activeOpacity={0.9} underlayColor = {'#CCCCCC'} >
              <View style = {styles.nameOptionContainer}>
                <View style = {[styles.checkBoxBorderName, {backgroundColor: this.state.chosenTwo? '#62C6C6': 'transparent'}]}>
                    <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                      source = {require('../ios/uncheck_green.png')}/>
                </View>     
                <Text style ={styles.nameOptionText}>{pets[1].basic.name}</Text>
              </View>
            </TouchableOpacity>
          </View>): null
        }
        {this.state.pet[2] ? 
          (<View style = {{borderRadius: 6, height: 28, width: 140}} >
              <TouchableOpacity onPress = {this.onChosenThree.bind(null, pets[2].basic.name)} activeOpacity={0.9} underlayColor = {'#CCCCCC'} >
              <View style = {styles.nameOptionContainer}>
                <View style = {[styles.checkBoxBorderName, {backgroundColor: this.state.chosenThree? '#62C6C6': 'transparent'}]}>
                    <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                      source = {require('../ios/uncheck_green.png')}/>
                </View>     
                <Text style ={styles.nameOptionText}>{"Wang Yue"}</Text>
              </View>
            </TouchableOpacity>
          </View>): null
        }
        {this.state.pet[3] ? 
          (<View style = {{borderRadius: 6, height: 28, width: 140}} >
              <TouchableOpacity onPress = {this.onChosenFour.bind(null, pets[3].basic.name)} activeOpacity={0.9} underlayColor = {'#CCCCCC'} >
              <View style = {styles.nameOptionContainer}>
                <View style = {[styles.checkBoxBorderName, {backgroundColor: this.state.chosenThree? '#62C6C6': 'transparent'}]}>
                    <Image style = {{height: 8, width: 8, resizeMode: 'stretch'}}
                      source = {require('../ios/uncheck_green.png')}/>
                </View>     
                <Text style ={styles.nameOptionText}>{pets[3].basic.name}</Text>
              </View>
            </TouchableOpacity>
          </View>): null
        }
        </Animated.View>

        <View style = {styles.pickUpPadding}/>

        <View style = {styles.pickUpLocationContainer}>
          <TouchableOpacity style = {{marginLeft: 0, marginTop: 0, height: 34, flexDirection: 'row', alignItems: 'center'}} activeOpacity = {1.0}
            onPress = {this.onPressSearch}>
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
        <TouchableOpacity style = {styles.pickUpButton} opacity = {0.9}
          onPressIn = {this.onPressPickUp}>
          <Image style = {{marginTop: 5, marginLeft: 0, width: 337, opacity: 0.9}}
            source = {require('../ios/pick_up.png')}/>
        </TouchableOpacity>
          <ActivityIndicator
            style = {[styles.indicator]}
            animating={this.state.isLoading}
            //hidden='true'
            size='small'/>
      </View>
    </Drawer>
  )}
  
});


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
    width: width,
    height: height,
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
    flexDirection: 'row',
    //opacity: 0.8,
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
    shadowOpacity: 0.4,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
    //marginVertical: 12
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
    shadowOpacity: 0.4,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    flexDirection: 'column',
    justifyContent: 'space-around',
    opacity: 0.9
  },

  selectDogNumber:{
    marginTop: 0,
    marginLeft: 0,
    borderRadius: 6,
    backgroundColor: 'white',
    width: 163,
    //flexDirection: 'row',
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0}, 
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.9
  },

  selectTime:{
    marginLeft: 11,
    marginTop: 0,
    borderRadius: 6,
    backgroundColor: 'white',
    width: 163,
    //flexDirection:'row',
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    justifyContent: 'center',
    opacity: 0.9
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

  nameOptionText:{
    marginLeft: 6,
    textAlign: 'center', 
    fontSize: 16, 
    fontFamily: 'SanFranciscoDisplay-Regular', 
    color: '#727272',
    flexDirection: 'row',
    //backgroundColor: 'red'
  },

  nameOptionContainer:{
    height: 28, 
    width: 140, 
    borderRadius: 6, 
    //backgroundColor: 'gray', 
    alignItems: 'center',
    flexDirection: 'row',
    //justifyContent: 'center',
    //marginVertical: 4,
    //paddingTop: 7
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
  },

  checkBoxBorderName: { 
    marginLeft: 8, 
    height: 16, 
    width: 16, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#62C6C6',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red'
  },

  indicator: {
    position: 'absolute',
    top: 572,
    left: 174.5,
    justifyContent: 'center',
    height: 25,
    width: 25,
    //backgroundColor: 'gray'
  },

  cellsContainer:{
    //height: this.state.n 
    width: 140, 
    //backgroundColor: 'red',
    borderRadius: 6,
    marginTop: 6,
  }

});

module.exports = MainPage;