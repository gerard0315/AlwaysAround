'use strict'

import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Dimensions from 'Dimensions';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS} from 'react-native';
import BasicsPage from './Basics.js';
import BehavioursPage from './Behaviours.js';
import HealthPage from './health.js';

export default class DogDetails extends Component{
    static propTypes = {
        Data: React.PropTypes.object.isRequired,
    }; 

    constructor(props){
    	super(props);
    	this.state = {

    	};
  	}

	render(){
		return(
    	<View style = {styles.container}>
	      <View style = {styles.topBarContainer}>
	        <TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
	          onPress = {Actions.pop}>
	          <Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
	            source = {require('../ios/goBack.png')}/>
	        </TouchableOpacity>
	        <Text style = {styles.topBarText}>{this.props.Data.Basics.Name}</Text>
	      </View>
	      	<View style = {styles.tabBarPadding}/>
			<ScrollableTabView
			   	tabBarPosition = 'overlayTop'
			 	tabBarUnderlineColor = '#FCC31B'
			   	tabBarBackgroundColor = '#EA4D4E'
		     	tabBarActiveTextColor = '#FCC31B'
		      	tabBarInactiveTextColor = 'white'
		      	tabBarTextStyle = {styles.tabBarText}>
     		    <BasicsPage data ={this.props.Data.Basics} style = {{marginTop: 24, backgroundColor: 'transparent'}} tabLabel='Basics'/>
				<BehavioursPage data ={this.props.Data.Behaviours} style = {{marginTop: 24, backgroundColor: 'white'}} tabLabel='Behaviours'/>
				<HealthPage data ={this.props.Data.Health} style = {{marginTop: 24, backgroundColor: 'white'}} tabLabel='Health'/>
			</ScrollableTabView>
	    </View>
			)
	}

}


var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },

  topBarContainer:{
    marginTop: 0,
    marginLeft: 0,
    height: 74,
    width: 375,
    backgroundColor: '#EA4D4E',
    //opacity: 0.9,
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  topBarText:{
    marginTop: 10,
    marginLeft: 125,
    color: 'white',
    fontSize: 20,
    fontFamily: 'SanFranciscoDisplay-Medium',
    backgroundColor: 'transparent',
  },

  tabBarText:{
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Regular',
    flexWrap: 'wrap',
  },

  tabBarPadding:{
  	position: 'absolute',
    left: 0,
    top: 71,
    right: 0,
    height: 23,
 	backgroundColor: '#EA4D4E',
  }

});