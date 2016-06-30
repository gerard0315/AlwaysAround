'use strict';
import {Actions} from 'react-native-router-flux';

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
  PropTypes,
} from 'react-native';

var ControlPanel = React.createClass({
	propTypes: {
    	closeDrawer: PropTypes.func.isRequired
  	},

	getInitialState: function(){
		return{
		  historyColor: '#EA4D4E',
	      historyTextColor: 'white',
	      historySource: require('../ios/history.png'),
	      myDogsColor: '#EA4D4E',
	      myDogsTextColor: 'white',
	      myDogsSource: require('../ios/dog.png'),
	      paymentColor: '#EA4D4E',
	      paymentTextColor: 'white',
        paymentSource: require('../ios/payment.png'),
	      promotionsColor: '#EA4D4E',
	      promotionsTextColor: 'white',
	      settingsColor: '#EA4D4E',
	      settingsTextColor: 'white',
	      helpColor: '#EA4D4E',
	      helpTextColor: 'white',
	  };
	},

  onPressInMyDogs: function(){
    this.setState({myDogsColor: '#FCC31B'});
    this.setState({myDogsTextColor: '#FCC31B'});
    this.setState({myDogsSource: require('../ios/dog_yellow.png')});
  },

  onPressOutMyDogs: function(){
    this.setState({myDogsColor: '#EA4D4E'});
    this.setState({myDogsTextColor: 'white'});
    this.setState({myDogsSource: require('../ios/dog.png')});
  },

  openMyDogs: function(){
    StatusBar.setHidden(false, null);
    this.props.closeDrawer();
    Actions.myDogs();
  },

  onPressInHistory: function(){
    this.setState({historyColor: '#FCC31B'});
    this.setState({historyTextColor: '#FCC31B'});
    this.setState({historySource: require('../ios/history_yellow.png')});
  },

  onPressOutHistory: function(){
    this.setState({historyColor: '#EA4D4E'});
    this.setState({historyTextColor: 'white'});
    this.setState({historySource: require('../ios/history.png')});
  },

  openHistory: function(){
    StatusBar.setHidden(false, null);
    this.props.closeDrawer();
    Actions.history();
  },

  onPressInPayment: function(){
    this.setState({paymentColor: '#FCC31B'});
    this.setState({paymentTextColor: '#FCC31B'});
    this.setState({paymentSource: require('../ios/payment_yellow.png')});
  },

  onPressOutPayment: function(){
    this.setState({paymentColor: '#EA4D4E'});
    this.setState({paymentTextColor: 'white'});
    this.setState({paymentSource: require('../ios/payment.png')});
  },

  openPayment: function(){
    StatusBar.setHidden(false, null);
    this.props.closeDrawer();
    Actions.paymentPage();
  },
	
	render(){
	return(
          <View style = {styles.menuContainer}>
            <View style = {styles.avatarContainer}>
              <Image style = {styles.avatar}
                source = {{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                />
              <View style = {{justifyContent: 'center', marginLeft: 15}}>
                <Text style = {{
                  fontSize: 18,
                  fontFamily: 'SanFranciscoDisplay-Medium',
                  color: 'white',
                  textAlign: 'center'
                  }}>Gerard</Text>
                </View>
            </View>
            <Animated.View style={{height: 10, marginTop: 0, marginLeft: 0, backgroundColor: '#EA4D4E'}}/>
            <Animated.View style = {styles.drawerButtons}>
              <TouchableOpacity style = {{flexDirection: 'row', marginLeft: 0, marginTop: 0, height: 50, alignItems: 'center'}} 
                activeOpacity = {0.9}
                onPressIn = {this.onPressInHistory}
                onPressOut = {this.onPressOutHistory}
                onPress = {this.openHistory}>
                <View style = {{height: 50, width:5, marginLeft: 0, backgroundColor: this.state.historyColor}}/>
                <Image style = {{marginLeft: 15, width: 18,}}
                  source = {this.state.historySource}/>
                <View style = {{alignItems: 'center', marginTop: 0, marginLeft: 0}}>
                  <Text style = {[styles.menuItem, {color: this.state.historyTextColor}]}>HISTORY</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {styles.drawerButtons}>
              <TouchableOpacity style = {{flexDirection: 'row', marginLeft: 0, marginTop: 0, height: 50, alignItems: 'center'}} 
                activeOpacity = {0.9}
                onPressIn = {this.onPressInMyDogs}
                onPressOut = {this.onPressOutMyDogs}
                onPress = {this.openMyDogs}>
                <View style = {{height: 50, width:5, marginLeft: 0, backgroundColor: this.state.myDogsColor}}/>
                <Image style = {{marginLeft: 15, width: 18,}}
                  source = {this.state.myDogsSource}/>
                <View style = {{alignItems: 'center', marginTop: 0, marginLeft: 0}}>
                  <Text style = {[styles.menuItem, {color: this.state.myDogsTextColor}]}>MY DOGS</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {styles.drawerButtons}>
              <TouchableOpacity style = {{flexDirection: 'row', marginLeft: 0, marginTop: 0, height: 50, alignItems: 'center'}} 
                activeOpacity = {0.9}
                onPressIn = {this.onPressInPayment}
                onPressOut = {this.onPressOutPayment}
                onPress = {this.openPayment}>
                <View style = {{height: 50, width:5, marginLeft: 0, backgroundColor: this.state.paymentColor}}/>
                <Image style = {{marginLeft: 15, width: 18,}}
                  source = {this.state.paymentSource}/>
                <View style = {{alignItems: 'center', marginTop: 0, marginLeft: 0}}>
                  <Text style = {[styles.menuItem, {color: this.state.paymentTextColor}]}>PAYMENT</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {styles.drawerButtons}>
              <TouchableOpacity style = {{flexDirection: 'row', marginLeft: 0, marginTop: 0, height: 50, alignItems: 'center'}} 
                activeOpacity = {0.9}>
                <View style = {{height: 50, width:5, marginLeft: 0, backgroundColor: this.state.promotionsColor}}/>
                <Image style = {{marginLeft: 15, width: 18,}}
                  source = {require('../ios/promotions.png')}/>
                <View style = {{alignItems: 'center', marginTop: 0, marginLeft: 0}}>
                  <Text style = {[styles.menuItem, {color: this.state.promotionsTextColor}]}>PROMOTIONS</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {styles.drawerButtons}>
              <TouchableOpacity style = {{flexDirection: 'row', marginLeft: 0, marginTop: 0, height: 50, alignItems: 'center'}} 
                activeOpacity = {0.9}>
                <View style = {{height: 50, width:5, marginLeft: 0, backgroundColor: this.state.settingsColor}}/>
                <Image style = {{marginLeft: 15, width: 18}}
                  source = {require('../ios/settings.png')}/>
                <View style = {{alignItems: 'center', marginTop: 0, marginLeft: 0}}>
                  <Text style = {[styles.menuItem, {color: this.state.settingsTextColor}]}>SETTINGS</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {styles.drawerButtons}>
              <TouchableOpacity style = {{flexDirection: 'row', marginLeft: 0, marginTop: 0, height: 50, alignItems: 'center'}} 
                activeOpacity = {0.9}>
                <View style = {{height: 50, width:5, marginLeft: 0, backgroundColor: '#FCC31B'}}/>
                <Image style = {{marginLeft: 15, width: 18,}}
                  source = {require('../ios/help.png')}/>
                <View style = {{alignItems: 'center', marginTop: 0, marginLeft: 0}}>
                  <Text style = {[styles.menuItem, {color: this.state.helpTextColor}]}>HELP</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style = {{marginTop: 20, height: 1, backgroundColor: 'white'}}/>
            <Animated.View>
              <TouchableOpacity style = {{marginTop: 20, marginLeft: 20}}>
                <Text style = {styles.menuItem}>ABOUT</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
	)}
});

var styles = React.StyleSheet.create({
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

});


module.exports = ControlPanel;