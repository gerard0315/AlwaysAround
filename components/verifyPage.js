'use strict';
import React, {Component, propTypes} from 'react';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, ScrollView, Dimensions, TextInput} from 'react-native';
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
var {height, width} = Dimensions.get('window');

var temp = ""

export default class pageVerify extends Component{
	static propTypes = {
        data: React.PropTypes.object,
    }; 

    constructor(props){
    	super(props);
    	this.state = {
    		phoneNumber: this.props.data.phoneNumber,
    		firstNumber: "",
    		secondNumber: "",
    		thirdNumber: "",
    		forthNumber: "",
    	};
  	}

  	onChangeOne(event){
  		this.setState({firstNumber: event.nativeEvent.text});
  		if (event.nativeEvent.text != ''){
  			this.refs.secondInput.focus();
	  	}
  	}
  	
  	onChangeTwo(event){
  		this.setState({secondNumber: event.nativeEvent.text});
  		if (event.nativeEvent.text != ''){
  			this.refs.thirdInput.focus();
  		}else{
  			this.refs.firstInput.focus();
  		}
  	}
  	
  	onChangeThree(event){
  		this.setState({thirdNumber: event.nativeEvent.text});
  		if (event.nativeEvent.text != ''){
  			this.refs.forthInput.focus();
  		}else{
  			this.refs.secondInput.focus();
  		}
  	}

  	onChangeFour(event){
  		this.setState({forthNumber: event.nativeEvent.text});
  		console.log("to MainPage");
  	} 
  	

  	render(){
  		return(
		<View style = {styles.container}>
		      <View style = {styles.shadow}/>
        	<Image style = {styles.bg} source = {require('../ios/BG.png')}/>
			<View style = {styles.topBarContainer}>
				<TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
					onPress = {this.onBack}>
					<Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
						source = {require('../ios/ban.png')}/>
				</TouchableOpacity>
				<Text style = {styles.topBarText}>VERIFY MOBILE</Text>
			</View>
			<View style = {{marginLeft: 51, marginTop: 19, height: 30, width: width - 102, justifyContent: 'center', backgroundColor: 'transparent'}}>
				<Text style = {styles.textUp}>Please enter your verification code</Text>
				<Text style = {styles.textDown}>{"sent to " + this.state.phoneNumber}</Text>
			</View>
			<View style = {styles.codeInputArea}>
				<View style = {[styles.inputBox, {marginLeft: 0}]}>
					<TextInput style = {styles.codeInput}
						ref = 'firstInput'
              			maxLength = {1}
              			autoFocus = {true}
              			value = {this.state.firstNumber}
              			onChange = {this.onChangeOne.bind(this)}
              			selectionColor = {"white"}
              			blurOnSubmit={false}
                        keyboardType = {'number-pad'}/>
                </View>
				<View style = {[styles.inputBox, {marginLeft: 20}]}>
					<TextInput style = {styles.codeInput}
						ref = 'secondInput'
						maxLength= {1}
    					value = {this.state.secondNumber}
              			onChange = {this.onChangeTwo.bind(this)}
              			selectionColor = {"white"}
              			blurOnSubmit={false}
                        keyboardType = {'number-pad'}/>
                </View>
				<View style = {[styles.inputBox, {marginLeft: 20}]}>
					<TextInput style = {styles.codeInput}
						ref = 'thirdInput'
              			maxLength= {1}
              			value = {this.state.thirdNumber}
              			onChange = {this.onChangeThree.bind(this)}
              			blurOnSubmit={false}
              			selectionColor = {"white"}
                        keyboardType = {'number-pad'}/>
                </View>
				<View style = {[styles.inputBox, {marginLeft: 20}]}>
					<TextInput style = {styles.codeInput}
						ref = 'forthInput'
              			maxLength= {1}
              			value = {this.state.forthNumber}
              			onChange = {this.onChangeFour.bind(this)}
              			blurOnSubmit={false}
              			selectionColor = {"white"}
                        keyboardType = {'number-pad'}/>
                </View>
			</View>

			<View style = {styles.optionsContainer}>
				<Text style = {styles.optionText}>RESEND THE TEXT</Text>
				<Text style = {styles.optionText}>CHANGE THE MOBILE NUMBER</Text>
			</View>

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
		backgroundColor: 'white',
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
        marginLeft: 92,
        color: 'white',
        fontSize: 20,
        fontFamily: 'SanFranciscoDisplay-Medium',
        backgroundColor: 'transparent',
	},

	textUp:{
		alignSelf: 'center',
		fontFamily: 'SanFranciscoDisplay-Medium',
		fontSize: 18,
		color: 'white'
	},

	textDown:{
		marginTop: 5,
		alignSelf: 'center',
		fontFamily: 'SanFranciscoDisplay-Regular',
		fontSize: 14,
		color: 'white'
	},

  	shadow:{
    	position: 'absolute',
    	left: 0,
	    top: 0,
	    height: 0.6,
	    right:0,
	    backgroundColor: 'black',
	    opacity: 0.5
  	},

  	bg:{
	    position: 'absolute',
	    left: 0,
	    top: 0,
	    right: 0,
	    bottom: 0,
	    //resizeMode: 'stretch'
  	},

  	codeInputArea:{
  		marginTop: 25,
  		width: 64*4+20*3,
  		marginLeft: (width-64*4-20*3)/2,
  		height: 64,
  		backgroundColor: 'transparent',
  		flexDirection: 'row',
  	},

  	inputBox:{
  		width: 64,
  		height: 64,
  		borderRadius: 2,
  		borderWidth: 1,
  		backgroundColor: 'white',
  		borderColor: 'white',
  		shadowOpacity: 0.8,
    	shadowRadius: 1,
	    shadowOffset: {
	      height: 0.5,
	      width: 0
	    },
	    justifyContent: 'center',
	    alignItems: 'center'
  	},

  	optionsContainer:{
  		width: 64*4+20*3,
  		height: 18,
  		marginTop: 25,
  		marginLeft: (width-64*4-20*3)/2,
  		backgroundColor: 'transparent',
  		justifyContent: 'space-between',
  		flexDirection: 'row'
  	},

  	optionText:{
  		fontSize: 14,
  		fontFamily: 'SanFranciscoDisplay-Medium',
  		color: "#62c6c6",
  		marginTop: 0
  	},

  	codeInput:{
	  	width: 30,
	    height: 55,
	    fontSize: 50,
	    marginLeft: 17,
	    fontFamily: 'SanFranciscoDisplay-Medium',
	    color: "#727272"
  	}
});