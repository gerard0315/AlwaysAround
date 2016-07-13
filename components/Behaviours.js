'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS} from 'react-native';

export default class BehavioursPage extends Component{
    static propTypes = {
        data: React.PropTypes.object.isRequired,
    }; 

    constructor(props){
    	super(props);
    	this.state = {
	      commands: this.props.data.Commands,
	      childFriendly: this.props.data.Child_friendly,
	      digs: this.props.data.Digs,
	      jumps: this.props.data.Jumps,
	      chipped: this.props.data.Chipped,
    	};
  	}

  	render(){
  		return(
    	<View style = {styles.container}>
    		<View style = {styles.shadow}/>
    		<View style = {styles.progressBar}>
    			<View style = {styles.progress}>
    				<Text style = {styles.progressText}>{"72%"}</Text>
    			</View> 
    		</View>
    		<View style = {[styles.titleBar, {marginTop: 15}]}>
    			<Text style = {styles.title}>Routines & Behaviours</Text>
    		</View>
    		<View style = {styles.commands}>
    			<Text style = {[styles.sectionTitle, {marginTop: 5, marginLeft: 19}]}>Commands the dog responds to:</Text>
    			<Text style = {[styles.sectionContent, {paddingTop: -5, width: 356, textAlign: 'right'}]}>{this.state.commands}</Text>
    		</View>
    		<View style = {styles.titleBar}>
    			<Text style = {styles.title}>The Dog</Text>
    		</View>
    		<View style = {{marginTop: 0, marginLeft: 0, height: 5}}/>
    		<ChildFriendly data = {this.state.childFriendly}/>
    		<Dig data = {this.state.digs}/>
    		<Jump data = {this.state.jumps}/>
    		<Chip data = {this.state.chipped}/>
    		<TouchableOpacity style = {styles.butonEdit}
    			activeOpacity = {0.8}>
    			<Image source = {require('../ios/edit.png')}/>
    		</TouchableOpacity>
    	</View>
	)}
}


class ChildFriendly extends React.Component{
    static propTypes = {
        data: React.PropTypes.bool.isRequired,
    }; 

	render(){
		if(this.props.data === true){
		return(
			<View>
		    	<View style = {styles.sectionContainer}>
		    		<Text style = {styles.sectionTitle}>Is child-friendly</Text>
		    		<Text style = {styles.sectionContent}>Yes</Text>
		    	</View>
		    	<View style = {styles.sectionDivider}/>
	    	</View>
		)}else{
			return(
			<View style = {{marginLeft: 0, marginTop: 0, height: 1, }}/>
			)
		}
	}
}


class Dig extends React.Component{
    static propTypes = {
        data: React.PropTypes.bool.isRequired,
    }; 

	render(){
		if(this.props.data === true){
		return(
			<View>
		    	<View style = {styles.sectionContainer}>
		    		<Text style = {styles.sectionTitle}>Digs</Text>
		    		<Text style = {styles.sectionContent}>Yes</Text>
		    	</View>
		    	<View style = {styles.sectionDivider}/>
	    	</View>
		)}else{
			return(
			<View style = {{marginLeft: 0, marginTop: 0, height: 1, }}/>
			)
		}
	}
}


class Jump extends React.Component{
    static propTypes = {
        data: React.PropTypes.bool.isRequired,
    }; 

	render(){
		if(this.props.data === true){
		return(
			<View>
		    	<View style = {styles.sectionContainer}>
		    		<Text style = {styles.sectionTitle}>Jumps on people</Text>
		    		<Text style = {styles.sectionContent}>Yes</Text>
		    	</View>
		    	<View style = {styles.sectionDivider}/>
	    	</View>
		)}else{
			return(
			<View style = {{marginLeft: 0, marginTop: 0, height: 1, }}/>
			)
		}
	}
}


class Chip extends React.Component{
    static propTypes = {
        data: React.PropTypes.bool.isRequired,
    }; 

	render(){
		if(this.props.data === true){
		return(
			<View>
		    	<View style = {styles.sectionContainer}>
		    		<Text style = {styles.sectionTitle}>Is micro-chipped</Text>
		    		<Text style = {styles.sectionContent}>Yes</Text>
		    	</View>
		    	<View style = {styles.sectionDivider}/>
	    	</View>
		)}else{
			return(
			<View style = {{marginLeft: 0, marginTop: 0, height: 1, }}/>
			)
		}
	}
}


var styles = StyleSheet.create({
	container: {
	    flexDirection: 'column',
	    marginTop: 23, 
	    marginLeft: 0, 
	    width: 375,
	    height: 573,
	    backgroundColor: 'white'

	},

	progressBar:{
		marginLeft: 19,
		marginTop: 5,
		width: 337,
		height: 10,
		backgroundColor: 'white',
		borderRadius: 2,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 0.6,
		shadowOffset: {width: 0.1, height: 0.1}
	},

	progress: {
		marginTop: 0,
		marginLeft: 0,
		width: 242,
		borderRadius: 2,
		height: 10,
		backgroundColor: '#62C2C2'
	},

	progressText:{
		fontSize: 8,
		color: 'white',
		fontFamily: 'SanFranciscoDisplay-Regular',
		//alignItems: 'flex-end',
		marginLeft: 221,
		backgroundColor: 'transparent'
	},

	shadow:{
		position: 'absolute',
		left: 0,
		top: 0,
		height: 0.6,
		right:0,
		backgroundColor: 'black',
		opacity: 0.2
	},

	title:{
		textAlign: 'center',
		color: 'white',
		fontFamily: 'SanFranciscoDisplay-Medium',
		fontSize: 18
	},

	titleBar:{
		//marginTop: 15,
		marginLeft: 0, 
		height: 30,
		width: 375,
		backgroundColor: '#EA4D4E',
		justifyContent: 'center',
		alignItems: 'center'
	},

	commands:{
		marginLeft: 0,
		marginTop: 0,
		height: 63,
		width: 375,
		backgroundColor: 'white',
		flexDirection: 'column',
		justifyContent: 'space-around'
	},

	sectionDivider:{
		height: 1,
		marginLeft: 19,
		width: 337,
		backgroundColor: '#B6B6B6',

	},

	sectionTitle: {
		fontSize: 16,
		fontFamily: 'SanFranciscoDisplay-Medium',
		color: '#727272',
		height: 21,
		//backgroundColor: 'green'
	},

	sectionContent:{
		fontSize: 16,
		fontFamily: 'SanFranciscoDisplay-Regular',
		color: '#727272',
		height: 21,
		//backgroundColor: 'green'
	},

	sectionContainer: {
		marginTop: 0,
		marginLeft: 19, 
		height: 29, 
		width: 337, 
		backgroundColor: 'white', 
		justifyContent:'space-between', 
		alignItems: 'center', 
		flexDirection: 'row'
	},

	butonEdit:{
		position: 'absolute',
		left: 19,
		right: 19,
		bottom: 10,
	}

})