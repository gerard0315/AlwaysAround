'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS} from 'react-native';


export default class BasicsPage extends Component{
    static propTypes = {
        data: React.PropTypes.object.isRequired,
    }; 

    constructor(props){
    	super(props);
    	this.state = {
        	name: this.props.data.Name,
        	gender: this.props.data.Gender,
      		breed: this.props.data.Breed,
      		birth: this.props.data.YoB,
      		size: this.props.data.Size,
	      	vacinated: this.props.data.Vacination,
	  		spayed: this.props.data.Spayed,
	      	friendly: this.props.data.Friendly,

    	};
  	}

  	render(){
  		return(
    	<View style = {styles.container}>
    		<View style = {styles.shadow}/>
    		<View style = {styles.progressBar}>
    			<View style = {styles.progress}>
    				<Text style = {styles.progressText}>{"36 %"}</Text>
    			</View> 
    		</View>
    		<View style = {styles.dogPicContainer}>
	    		<Image style = {styles.dogPic}
	    			source = {require('../ios/dog_pic.png')}/>
    		</View>
    		<Text style = {styles.sectionIntro}>{"Describe your dog briefly..."}</Text>
    		<View style = {[styles.sectionDivider, {marginTop: 10}]}/>
    		<View style = {styles.sectionContainer}>
    			<Text style = {styles.sectionTitle}>Gender</Text>
    			<Text style = {styles.sectionContent}>{this.state.gender}</Text>
    		</View>
    		<View style = {[styles.sectionDivider, {marginTop: 0}]}/>
    		<View style = {styles.sectionContainer}>
    			<Text style = {styles.sectionTitle}>Breed</Text>
    			<Text style = {styles.sectionContent}>{this.state.breed}</Text>
    		</View>
    		<View style = {[styles.sectionDivider, {marginTop: 0}]}/>
    		<View style = {styles.sectionContainer}>
    			<Text style = {styles.sectionTitle}>Year of birth</Text>
    			<Text style = {styles.sectionContent}>{this.state.birth}</Text>
    		</View>
    		<View style = {[styles.sectionDivider, {marginTop: 0}]}/>
    		<View style = {styles.sectionContainer}>
    			<Text style = {styles.sectionTitle}>Size</Text>
    			<Text style = {styles.sectionContent}>{this.state.size}</Text>
    		</View>
    		<View style = {[styles.sectionDivider, {marginTop: 0}]}/>
    		<Vacination data = {this.state.vacinated}/>
    		<Spayed data = {this.state.spayed}/>
    		<Friendly data = {this.state.friendly}/>
    		<TouchableOpacity style = {styles.butonEdit}
    			activeOpacity = {0.8}>
    			<Image source = {require('../ios/edit.png')}/>
    		</TouchableOpacity>
	    </View>
  	)}

}


class Vacination extends React.Component{
    static propTypes = {
        data: React.PropTypes.bool.isRequired,
    }; 

	render(){
		if(this.props.data === true){
		return(
			<View>
		    	<View style = {styles.sectionContainer}>
		    		<Text style = {styles.sectionTitle}>Vacinations up to date</Text>
		    		<Text style = {styles.sectionContent}>Yes</Text>
		    	</View>
		    	<View style = {[styles.sectionDivider, {marginTop: 0}]}/>
	    	</View>
		)}else{
			return(
			<View style = {{marginLeft: 0, marginTop: 0, height: 1, }}/>
			)
		}
	}
}

class Spayed extends React.Component{
    static propTypes = {
        data: React.PropTypes.bool.isRequired,
    }; 

	render(){
		if(this.props.data === true){
		return(
			<View>
		    	<View style = {styles.sectionContainer}>
		    		<Text style = {styles.sectionTitle}>Neutered / Spayed</Text>
		    		<Text style = {styles.sectionContent}>Yes</Text>
		    	</View>
		    	<View style = {[styles.sectionDivider, {marginTop: 0}]}/>
	    	</View>
		)}else{
			return(
			<View style = {{marginLeft: 0, marginTop: 0, height: 1, }}/>
			)
		}
	}
}

class Friendly extends React.Component{
    static propTypes = {
        data: React.PropTypes.bool.isRequired,
    }; 

	render(){
		if(this.props.data === true){
		return(
			<View>
		    	<View style = {styles.sectionContainer}>
		    		<Text style = {styles.sectionTitle}>Friendly with other dogs</Text>
		    		<Text style = {styles.sectionContent}>Yes</Text>
		    	</View>
		    	<View style = {[styles.sectionDivider, {marginTop: 0}]}/>
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
		//borderWidth: 0.6,
		//borderColor: '#B6B6B6',
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowRadius: 0.6,
		shadowOffset: {width: 0.1, height: 0.1}
	},

	bg:{
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		//resizeMode: 'stretch'
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

	progress: {
		marginTop: 0,
		marginLeft: 0,
		width: 121,
		borderRadius: 2,
		height: 10,
		backgroundColor: '#62C2C2'
	},

	progressText:{
		fontSize: 8,
		color: 'white',
		fontFamily: 'SanFranciscoDisplay-Regular',
		//alignItems: 'flex-end',
		marginLeft: 100,
		backgroundColor: 'transparent'
	},

	dogPicContainer:{
		marginTop: 15, 
		height: 80, 
		width: 80, 
		borderRadius: 40, 
		alignSelf: 'center',
		shadowOpacity: 0.4,
		shadowRadius: 0.6,
		shadowOffset: {width: 0, height: 0}

	},

	dogPic:{
		marginTop: 0, 
		height: 80, 
		width: 80, 
		borderRadius: 40, 

	},

	sectionIntro:{
		marginTop: 6,
		textAlign: 'center',
		alignSelf: 'center',
		fontFamily: 'SanFranciscoDisplay-Regular',
		color: '#B6B6B6',
		fontSize: 16
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
		color: '#727272'
	},

	sectionContent:{
		fontSize: 16,
		fontFamily: 'SanFranciscoDisplay-Regular',
		color: '#727272'		
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