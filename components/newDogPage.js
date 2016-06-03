'use strict';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var ListPopover = require('react-native-list-popover');
var FloatLabelTextInput = require('react-native-floating-label-text-input');
import {Actions} from 'react-native-router-flux';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Navigator,
  TextInput,
  Switch,
  TouchableHighlight,
  SegmentedControlIOS,
  ScrollView,
} from 'react-native';

var ItemCheckbox = require('react-native-item-checkbox');
const DropDown = require('react-native-dropdown');

const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;


var breed = ["breed 1", "breed 2"];
var year = [2014, 2015, 2016];
var	size = ["small", "medium", "large"];

exports.framework = 'React';

var AddDog = React.createClass({
	getInitialState: function() {
    	return {
      		dogName: '',
      		breed: '',
      		year: '',
      		size: '',
      		genderList: ['Male', 'Female'],
      		gender: null,
      		intro: null,
      		contentOffset: {x: 0, y: 0},
      		_Vaccination: false,
      		_Spay: false,
      		_Friendly: false,
      		source_v: require('../ios/BLANK_ICON.png'),
      		source_s: require('../ios/BLANK_ICON.png'),
      		source_f: require('../ios/BLANK_ICON.png'),
    	};
  	},

  	onDogNameInput: function(event) {
  		//console.log('editing Name');
      	this.setState({ dogName: event.nativeEvent.text });
      	//console.log(this.state.dogName);
      	console.log('name above');
  	},

  	textInputFocused(event){
    	this.setState({
      	contentOffset:{
        	x: 0,
        	y: 250,
      	}
    	});

  	},

  	textInputBlur(event){
    	this.setState({
      	contentOffset:{
        	x: 0,
        	y: 0,
      	}
    	});
  	},

  	_onValueChange(gender) {
    	this.setState({
      	gender: gender,
    	});
    	console.log(this.state.gender)
  	},

  	onBreedInput: function(event){
  		this.setState({ breed : event.nativeEvent.text});
  	},

  	onYearInput: function(event){
  		this.setState({ year : event.nativeEvent.text});
  	},

  	onSizeInput: function(){
  		this.setState({ size : event.nativeEvent.text});
  		console.log(this.state.size);
  	},

	onIntroInput: function(event){
		this.setState({ intro : event.nativeEvent.text });
		console.log(this.state.intro);
	},

	onPressV: function(event){
		this.setState({ _Vaccination: !this.state._Vaccination});
		this.setState({ source_v: (this.state._Vaccination) ? require('../ios/check.png'): require('../ios/BLANK_ICON.png')});
		//console.log(this.state._Vaccination);
	},

	onPressS: function(event){
		this.setState({ _Spay: !this.state._Spay});
		this.setState({ source_s: (this.state._Spay) ? require('../ios/check.png'): require('../ios/BLANK_ICON.png')});
      	console.log(this.state.dogName);
      	console.log('name above');
	},

	onPressF: function(event){
		this.setState({ _Friendly: !this.state._Friendly});
		this.setState({ source_f: (this.state._Friendly) ? require('../ios/check.png'): require('../ios/BLANK_ICON.png')});
		//console.log(this.state._Friendly);
	},

	render(){
		return(
			<ScrollView style = {styles.container} scrollEnabled={false} contentOffset = {this.state.contentOffset}>
				<View style = {styles.topBar}>
					<TouchableOpacity style = {styles.buttonBack} 
						onPress = {Actions.pop}>
						<Text style = {styles.backText}>BACK</Text>
					</TouchableOpacity>
					<Text style = {styles.pageTitle}>New Dog</Text>
					<TouchableOpacity style = {styles.buttonSave} >
						<Text style = {styles.saveText}>SAVE</Text>
					</TouchableOpacity>
				</View>
				<View style = {styles.dogNameCol}>
					<View style = {styles.iconContainer}>
						<Image style = {styles.dogNameIcon}  source ={require('../ios/pawIcon.png')}/>
					</View>
					<View style = {styles.nameInputContainer}>
				        <FloatLabelTextInput
				        	//selectionColor = "#D25061"
				          	placeholder={"Dos's Name Here"}
				          	//value={"value of field"}
	                        value={this.state.dogName}
	                        onChangeTextValue={this.onDogNameInput}
				        />
				    </View>
				</View>
				<View style = {styles.sectionTitleContainer}>
					<Text style = {styles.sectionTitle}>Basic Information</Text>
				</View>
				<View style={styles.dropDownContainer}>
					<View style = {styles.infoInputContainer}>
				        <FloatLabelTextInput
				        	//selectionColor = "#D25061"
				          	placeholder={"Breed?"}
	                        value={this.state.breed}
	                        onChangeTextValue={this.onBreedInput}
				        />
				    </View>

					<View style = {styles.infoInputContainer}>
				        <FloatLabelTextInput
				        	//selectionColor = "#D25061"
				          	placeholder={"Year of birth"}
	                        value={this.state.year}
	                        onChangeTextValue={this.onYearInput}
				        />
				    </View>

					<View style = {styles.infoInputContainer}>
				        <FloatLabelTextInput
				        	//selectionColor = "#D25061"
				          	placeholder={"What's the size?"}
	                        value={this.state.size}
	                        onChangeTextValue={this.onSizeInput}
				        />
				    </View>
			    </View>
			    	<View style= {styles.checkBoxCol}>
			    	<Text style = {{color: '#F4BD35', marginLeft: 10, marginTop: 7, fontSize: 15}}>Vaccination</Text>
			    		<View style = {styles.checkBoxStyle}>
				   	    <TouchableOpacity 
				   	    	style = {styles.checkBox}
				   	    	onPress = {this.onPressV}
				   	    	>				   	 
				   	    	<Image style = {styles.checkImage}
				   	    			source = {this.state.source_v}/>
				   	    </TouchableOpacity>
				  
						</View>
					</View>
			    	<View style= {styles.checkBoxCol}>
			    	<Text style = {{color: '#F4BD35',marginLeft: 10, marginTop: 7, fontSize: 15}}>Neutered/Spayed</Text>
			    		<View style = {styles.checkBoxStyle}>
				   	    <TouchableOpacity 
				   	    	style = {styles.checkBox}
				   	    	onPress = {this.onPressS}
				   	    	>				   	 
				   	    	<Image style = {styles.checkImage}
				   	    			source = {this.state.source_s}/>
				   	    </TouchableOpacity>
						</View>
					</View>
			    	<View style= {styles.checkBoxCol}>
			    	<Text style = {{color: '#F4BD35', marginLeft: 10, marginTop: 7, fontSize: 15}}>Friendly With Other Dogs</Text>
			    		<View style = {styles.checkBoxStyle}>
				   	    <TouchableOpacity 
				   	    	style = {styles.checkBox}
				   	    	onPress = {this.onPressF}
				   	    	>				   	 
				   	    	<Image style = {styles.checkImage}
				   	    			source = {this.state.source_f}/>
				   	    </TouchableOpacity>
						</View>
					</View>
					<SegmentedControlIOS
						marginTop = {10}
						marginLeft = {30}
						marginRight = {35}
						marginBottom = {10}
						tintColor="#F4BF34" 
						values= {this.state.genderList}
						onValueChange={this._onValueChange}
						selectedIndex={0} />
					<TextInput style = {styles.introInput}
						multiline = {true}
						placeholder = " Briefly Describe Your Dog"
						placeholderTextColor = '#F4BD35'
						value={this.state.intro}
						onChange = {this.onIntroInput}
                        onFocus={this.textInputFocused}
                        onBlur={this.textInputBlur}
						/>
			</ScrollView>			
			)}

});

var styles = React.StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#E15667',
	},

	topBar:{
    	//position: 'absolute',
    	backgroundColor: '#E15668',
    	marginTop: 0,
    	marginLeft: 0,
    	height: 80,
    	flexDirection:'row',
	},

	buttonBack:{
		marginLeft: 30,
		marginTop: 45,
	},

	backText:{
		fontWeight: 'normal',
		fontSize: 15,
		color:'#F4BD35',
	},

	pageTitle:{
		marginTop: 40,
		fontWeight: 'bold',
		fontSize: 20,
		color: '#F4BD35',
		textAlign:'center',
		flex:1,
	},

	buttonSave:{
		marginRight: 30,
		marginTop: 45,
	},

	saveText:{
		fontWeight: 'normal',
		fontSize: 15,
		color:'#F4BD35',
	},

	dogNameCol:{
		//backgroundColor: 'gray',
		height: 90,
    	flexDirection:'row',
	},

	iconContainer:{
		//flex: 1,
		marginLeft: 40,
		marginTop: 10, 
	},

	dogNameIcon:{
		width: 80,
    	height: 80,
    	borderRadius: 80/2,
    	borderColor: "#F4BF34",
    	borderWidth: 5,
    	shadowOpacity: 0.5,
    	shadowRadius: 2,
    	shadowColor: "#C69CA2",
	},

	dogNameInput:{
		position:'absolute',
        left: 150,
        top: 100,
        right: 50,
        height: 30,		
		fontSize: 20,
		backgroundColor: '#fff',
	},

	nameInputContainer:{
		marginTop: 30,
		marginBottom: 20,
		marginLeft: 25,
		marginRight: 20,
		width: 195,
		height: 40,
		backgroundColor: '#D25061',
	},

	sectionTitleContainer:{
		backgroundColor: '#E15667',
	},

	sectionTitle:{
		marginLeft: 30,
		marginTop: 10,
		marginBottom: 10,
		fontSize: 20,
		color: '#F4BD35',
	},

	dropDownContainer:{
		marginTop: 10,
		marginLeft: 20,
		justifyContent: 'center',
		//backgroundColor: '#fff',
		height: 130,
	},

	checkBoxCol:{
		flexDirection: 'row',
		height: 30,
		marginLeft: 20,
		marginTop:10,
		marginRight: 30,
		//backgroundColor: '#E15667',

	},

	checkBox:{
		height: 30,
		width: 30,
		borderRadius: 30/2,
		borderWidth: 3,
		borderColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	},

	checkImage:{
		height: 30,
		width:30,
		borderRadius: 30/2,
		//marginBottom: 10,
	},

	checkBoxStyle:{
		flex: 1,
		alignItems: 'flex-end',
	},

	button: {
    	borderRadius: 4,
    	padding: 10,
    	marginLeft: 10,
    	marginRight: 30,
    	backgroundColor: "#D25061",
  	},

  	introInput:{
  		marginTop: 10,
  		marginBottom: 10,
  		marginLeft: 30,
  		marginRight: 35,
  		borderWidth: 1,
  		borderRadius: 4,
  		paddingLeft: 10,
  		paddingRight: 5,
  		paddingBottom: 5,
  		fontSize: 15,
  		color: '#F4BD35',
  		borderColor: '#F4BD35',
  		height: 100,
  		backgroundColor: '#D25061'
  	},

  	infoInputContainer:{
		marginTop: 0,
		marginBottom: 10,
		marginLeft: 20,
		marginRight: 10,
		width: 300,
		height: 35,
		//backgroundColor: '#D25061'
  	},

});

module.exports = AddDog;