'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Dimensions from 'Dimensions';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS} from 'react-native';
import EditBasics from './EditBasicsPage.js';
import EditBehaviours from './EditBehavePge.js';
import EditHealth from './EditHealthPage';

export default class EditDog extends Component{
    static propTypes = {
        data: React.PropTypes.object.isRequired,
        title: React.PropTypes.string.isRequired,
        initialPage: React.PropTypes.number.isRequired,
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
	        <Text style = {styles.topBarText}>{this.props.title}</Text>
	      </View>
	      	<View style = {styles.tabBarPadding}/>
			<ScrollableTabView
			   	tabBarPosition = 'overlayTop'
			 	tabBarUnderlineColor = '#FCC31B'
			   	tabBarBackgroundColor = '#EA4D4E'
		     	tabBarActiveTextColor = '#FCC31B'
		      	tabBarInactiveTextColor = 'white'
		      	initialPage = {this.props.initialPage}
		      	tabBarTextStyle = {styles.tabBarText}>
		      	
     		    <EditBasics data ={this.props.data.Basics} tabLabel='Basics'/>
     		    <EditBehaviours data ={this.props.data.Behaviours} tabLabel = 'Behaviours'/>
     		    <EditHealth data ={this.props.data.Health} tabLabel = 'Health'/>
				
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
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5}
  },

  topBarText:{
    marginTop: 10,
    marginLeft: 117,
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
    top: 74,
    right: 0,
    height: 23,
 	backgroundColor: '#EA4D4E',
  }

});