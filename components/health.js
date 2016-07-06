'use strict'

'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS} from 'react-native';

export default class HealthPage extends Component{
    static propTypes = {
        data: React.PropTypes.object.isRequired,
    }; 

    constructor(props){
    	super(props);
    	this.state = {
    		onMeds: this.props.data.OnMeds,
    		allergies: this.props.data.Allergies,
    		vetName: this.props.data.Veterinary.Name,
    		vetAddress: this.props.data.Veterinary.Address,
    		vetPhone: this.props.data.Veterinary.Phone,
    		insuName: this.props.data.Insurance.Name,
    		insuNumber: this.props.data.Insurance.Number,
    	};
  	}

  	render(){
  		return(
    	<View style = {styles.container}>
    		<View style = {styles.shadow}/>
    		<View style = {styles.progressBar}>
    			<View style = {styles.progress}>
    				<Text style = {styles.progressText}>{"100%"}</Text>
    			</View> 
    		</View>
    		<View style = {[styles.titleBar, {marginTop: 15}]}>
    			<Text style = {styles.title}>Health information</Text>
    		</View>
    		<View style = {styles.healthSection}>
    			<View style = {{marginTop: 0, marginLeft: 19, width: 337, height: 34.5, flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center'}}>
    				<Text style = {[styles.sectionTitle]}>Is on any medication</Text>
    				<Text style = {styles.sectionContent}>{this.state.onMeds}</Text>
    			</View>
    			<View style = {styles.sectionDivider}/>
    			<View style = {{marginTop: 0, marginLeft: 19, width: 337, height: 34.5, flexDirection: 'row' , justifyContent: 'space-between', alignItems: 'center'}}>
    				<Text style = {[styles.sectionTitle]}>Has any allergies</Text>
    				<Text style = {styles.sectionContent}>{this.state.allergies}</Text>
    			</View>
    		</View>
    		<View style = {styles.titleBar}>
    			<Text style = {styles.title}>Veteneray & Insurance</Text>
    		</View>
    		<View style = {{marginTop: 0, marginLeft: 0, height: 5}}/>
    		<View style = {styles.sectionContainer}>
    			<Text style = {[styles.sectionTitle, {alignSelf: 'flex-start'}]}>Veteneray name</Text>
    			<Text style = {[styles.sectionContent, {alignSelf: 'flex-end'}]}>{this.state.vetName}</Text>
    		</View>
    		<View style = {styles.sectionDivider}/>
    		<View style = {styles.sectionContainer}>
    			<Text style = {[styles.sectionTitle, {alignSelf: 'flex-start'}]}>Veteneray address</Text>
    			<Text style = {[styles.sectionContent, {alignSelf: 'flex-end'}]}>{this.state.vetAddress}</Text>
    		</View>
    		<View style = {styles.sectionDivider}/>
    		<View style = {styles.sectionContainer}>
    			<Text style = {[styles.sectionTitle, {alignSelf: 'flex-start'}]}>Veteneray phone number</Text>
    			<Text style = {[styles.sectionContent, {alignSelf: 'flex-end'}]}>{this.state.vetPhone}</Text>
    		</View>
    		<View style = {styles.sectionDivider}/>
    		<View style = {styles.sectionContainer}>
    			<Text style = {[styles.sectionTitle, {alignSelf: 'flex-start'}]}>Insurance name</Text>
    			<Text style = {[styles.sectionContent, {alignSelf: 'flex-end'}]}>{this.state.insuName}</Text>
    		</View>
    		<View style = {styles.sectionDivider}/>
    		<View style = {styles.sectionContainer}>
    			<Text style = {[styles.sectionTitle, {alignSelf: 'flex-start'}]}>Insurance Number</Text>
    			<Text style = {[styles.sectionContent, {alignSelf: 'flex-end'}]}>{this.state.insuNumber}</Text>
    		</View>
    		<View style = {styles.sectionDivider}/>
    		<TouchableOpacity style = {styles.butonEdit}
    			activeOpacity = {0.8}>
    			<Image source = {require('../ios/edit.png')}/>
    		</TouchableOpacity>
    	</View>
	)}
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
		width: 337,
		borderRadius: 2,
		height: 10,
		backgroundColor: '#62C2C2'
	},

	progressText:{
		fontSize: 8,
		color: 'white',
		fontFamily: 'SanFranciscoDisplay-Regular',
		//alignItems: 'flex-end',
		marginLeft: 312,
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
		height: 29,
		width: 375,
		backgroundColor: '#EA4D4E',
		justifyContent: 'center'
	},

	healthSection:{
		marginLeft: 0,
		marginTop: 0,
		height: 70,
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
		height: 53, 
		width: 337, 
		backgroundColor: 'white', 
		justifyContent:'space-around', 
		//alignItems: 'center', 
		flexDirection: 'column'
	},

	butonEdit:{
		position: 'absolute',
		left: 19,
		right: 19,
		bottom: 10,
	}

})