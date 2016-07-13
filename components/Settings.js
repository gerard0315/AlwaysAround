'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, TextInput, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS} from 'react-native';

class ModalView extends React.Component{
	static propTypes = {
		closeModal: React.PropTypes.func.isRequired,
		data: React.PropTypes.object.isRequired,
    };

    constructor(props){
    	super(props);
    	this.state = {
    		password: '',
    	};
  	}

    componentWillMount(){
    	console.log(this.props.data.data);
    	console.log("jhahahahahah");
    }

    onPasswordInput(event){
  		this.setState({ password : event.nativeEvent.text});    	
    }

    toEdit(){
    	this.props.closeModal();
    	Actions.editAccount();
    }

	render(){
	    var modalBackgroundStyle = {
	      backgroundColor: 'rgba(0, 0, 0, 0.8)',
	    };
	    if(this.props.data.data === 'signout'){
		return(

	          <View style={[styles.modalContainer, modalBackgroundStyle]}>
	          	<View style = {styles.alertContainer}>
	          		<Text style = {[styles.alertChoice, {color: '#727272', textAlign: 'center', marginTop: 15, backgroundColor: 'transparent'}]}>SIGN OUT</Text>
	          		<View style = {{marginTop: 0, marginLeft: 0, width: 301, height: 39, flexWrap: 'wrap', justifyContent: 'center'}}>
	          			<Text style = {[styles.alertText, {textAlign: 'center'}]}>Are you sure you want to sign out?</Text>
	          		</View>
	          		<View style = {{height: 1, backgroundColor: '#B6B6B6', width: 301, marginTop: 0, marginLeft: 0}}/>
	          		<View style = {{height: 43, marginTop: 0, marginLeft: 0, width: 301, flexDirection: 'row', alignItems: 'center'}}>
	          			<TouchableOpacity style = {{marginLeft: 0, marginTop: 0, width: 150, height: 43, justifyContent:'center'}}
	          				onPress= {this.props.closeModal}>	          				
	          				<Text style = {[styles.alertChoice, {color: '#EA4D4E'}]}>CANCEL</Text>
	          			</TouchableOpacity>
	          			<View style = {{height: 43, width: 1, marginLeft: 0, marginTop: 0, backgroundColor: '#B6B6B6'}}/>
	          			<TouchableOpacity style = {{marginLeft: 0, marginTop: 0, width: 150, height: 43, justifyContent: 'center'}}
	          				onPress= {this.props.closeModal}>
	          				<Text style = {[styles.alertChoice, {color: '#727272'}]}>SIGN OUT</Text>
	          			</TouchableOpacity>
	          		</View>
	          	</View>
	          </View>

		)}else if(this.props.data.data === 'edit'){
			return(

	          <View style={[styles.modalContainer, modalBackgroundStyle]}>
	          	<View style = {styles.pwVerifyContainer}>
	          		<Text style = {[styles.alertChoice, {paddingTop: 5, color: '#727272', textAlign: 'center', marginTop: 15, backgroundColor: 'transparent'}]}>VERIFY ACCOUNT</Text>
	          		<View style = {{marginTop: 0, marginLeft: 0, width: 301, height: 39, flexWrap: 'wrap', justifyContent: 'center'}}>
	          			<Text style = {[styles.alertText, {marginLeft: 19, height: 15}]}>ENTER YOUR PASSWORD</Text>
	          		</View>
	          		<View style = {styles.passwordInputContainer}>
	          			<TextInput style = {styles.passwordInput} 
	          			    secureTextEntry={true}
							value = {this.state.password}
							onChange = {this.onPasswordInput.bind(this)}/>
	          		</View>
	          		<View style = {{marginTop: 0, marginLeft: 0, width: 300, height: 44, alignItems: 'center', justifyContent: 'center'}}>
	          			<Text style = {styles.forgetPassword}>Forgot Password?</Text>
	          		</View>
	          		<View style = {{height: 1, backgroundColor: '#B6B6B6', width: 301, marginTop: 0, marginLeft: 0}}/>
	          		<View style = {{height: 43, marginTop: 0, marginLeft: 0, width: 301, flexDirection: 'row', alignItems: 'center'}}>
	          			<TouchableOpacity style = {{marginLeft: 0, marginTop: 0, width: 150, height: 43, justifyContent:'center'}}
	          				onPress= {this.props.closeModal}>	          				
	          				<Text style = {[styles.alertChoice, {color: '#727272'}]}>CANCEL</Text>
	          			</TouchableOpacity>
	          			<View style = {{height: 43, width: 1, marginLeft: 0, marginTop: 0, backgroundColor: '#B6B6B6'}}/>
	          			<TouchableOpacity style = {{marginLeft: 0, marginTop: 0, width: 150, height: 43, justifyContent: 'center'}}
	          				onPress= {this.toEdit.bind(this)}>
	          				<Text style = {[styles.alertChoice, {color: '#62C6C6'}]}>SUBMIT</Text>
	          			</TouchableOpacity>
	          		</View>
	          	</View>
	          </View>
			
			)
		}
	}
}


export default class SettingsPage extends Component{
    static propTypes = {
    }; 

    constructor(props){
    	super(props);
    	this.state = {
    		username: 'Luna Baetylus',
    		location_1: '1 Killick Way',
    		location_2: null,
        	modalVisible: false,
        	modalId: null,
    	};
  	}

  	onLocationOneChange(event){
  		this.setState({ location_1 : event.nativeEvent.text});
  	}

  	onLocationTwoChange(event){
  		this.setState({ location_2 : event.nativeEvent.text});
  	}

	_setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	onPressSignout(){
		this.setState({modalId: 'signout'});
		this._setModalVisible(true);		
	}

	onSignOut(){
		this._setModalVisible(false);
	}

	onEditAcc(){
		this.setState({modalId: 'edit'});
		this._setModalVisible(true);
	}

	closeModal(){
		this._setModalVisible(false);
	}

  	render(){
  		return(
		<ScrollView style = {styles.container} scrollEnabled = {false}>
			<Modal
	          animationType={'fade'}
	          transparent={true}
	          visible={this.state.modalVisible}
	          onRequestClose={() => {this._setModalVisible(false)}}
	          >
	        	<ModalView data = {{data: this.state.modalId}} closeModal = {this.closeModal.bind(this)}/>
	        </Modal>
			<View style = {styles.topBarContainer}>
				<TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
					onPress = {Actions.pop}>
					<Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
						source = {require('../ios/goBack.png')}/>
				</TouchableOpacity>
				<Text style = {styles.topBarText}>Settings</Text>
			</View>
			<Image style = {styles.avatar}
				source = {{uri:'http://36.media.tumblr.com/c1ab83d6816fb7302a230d5ce9580446/tumblr_inline_o3bwh2h8z81sitizh_540.jpg'}}/>
			<Text style = {styles.userName}>{this.state.username}</Text>
			<Text style = {styles.editText} onPress = {this.onEditAcc.bind(this)}>EDIT ACCOUNT</Text>
			<View style = {{marginTop: 15, marginLeft: 0, marginRight: 0, height: 30, backgroundColor: '#EA4D4E', justifyContent: 'center'}}>
				<Text style = {styles.sectionTitleText}>FAVORITE PLACES</Text>
			</View>
			<View style = {styles.inputFieldContainer}>
				<View style = {styles.inputCell}>
					<Image style = {{marginLeft: 10, height: 17, resizeMode: 'stretch'}}
						source = {require('../ios/location_input.png')}/>
					<TextInput style = {styles.locationInput}
						placeholder = {"Enter a favourite place"}
						placeholderTextColor = {"#B6B6B6"}
						value = {this.state.location_1}
						onChange = {this.onLocationOneChange.bind(this)}
						/>
					<Image style = {{marginLeft: 32, height: 14, resizeMode: 'stretch'}}
						source = {require('../ios/detals_arrow.png')}/>
				</View>
				<View style = {{height: 1, width: 335, marginTop: 0, marginLeft: 0, backgroundColor: '#B6B6B6'}}/>
				<View style = {styles.inputCell}>
					<Image style = {{marginLeft: 10, height: 17, resizeMode: 'stretch'}}
						source = {require('../ios/location_input.png')}/>
					<TextInput style = {styles.locationInput}
						placeholder = {"Enter a favourite place"}
						placeholderTextColor = {"#B6B6B6"}
						value = {this.state.location_2}
						onChange = {this.onLocationTwoChange}
						/>
					<Image style = {{marginLeft: 32, height: 14, resizeMode: 'stretch'}}
						source = {require('../ios/detals_arrow.png')}/>
				</View>
			</View>

			<TouchableOpacity style = {styles.bottomButton} activeOpacity = {0.9}
				onPress= {this.onPressSignout.bind(this)}>
				<Text style = {[styles.signoutText]}>SIGN OUT</Text>
			</TouchableOpacity>	
		</ScrollView>
  	
  	)}
}

var styles = StyleSheet.create({
	container: {
		//flexDirection: 'column',
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
		alignItems: 'center',
		flexDirection: 'row',
    	shadowRadius: 0.6,
    	shadowOpacity: 0.2,
    	shadowColor: 'black',
    	shadowOffset: {width: 0, height: 0.5}
	},

	topBarText:{
        marginTop: 10,
        marginLeft: 118,
        color: 'white',
        fontSize: 20,
        fontFamily: 'SanFranciscoDisplay-Medium',
        backgroundColor: 'transparent',
	},

	avatar: {
		marginTop: 15,
		alignSelf: 'center',
		height: 80,
		width: 80,
		borderRadius: 40,
		resizeMode: 'cover'
	},

	userName:{
		marginTop: 5,
		fontFamily: 'SanFranciscoDisplay-Medium',
		fontSize: 14,
		color: '#727272',
		textAlign: 'center',
		alignSelf: 'center'
	},

	editText:{
		marginTop: 5,
		fontFamily: 'SanFranciscoDisplay-Medium',
		fontSize: 14,
		color: '#62C6C6',
		textAlign: 'center',
		alignSelf: 'center'
	},

	sectionTitleText:{
		paddingTop: -1,
		color: 'white',
		backgroundColor: 'transparent',
		textAlign: 'center',
		fontFamily: 'SanFranciscoDisplay-Medium',
		fontSize: 18
	},

	inputFieldContainer:{
		marginTop: 15, 
		marginLeft: 19, 
		width: 337, 
		height: 73, 
		borderWidth: 1, 
		borderRadius: 2, 
		borderColor: '#B6B6B6',
		flexDirection: 'column'
	},

	inputCell:{
		marginLeft: 0,
		marginTop: 0, 
		width: 335, 
		height: 35,
		flexDirection: 'row',
		alignItems: 'center',
		//backgroundColor: 'green'
	},

	locationInput:{
		marginLeft: 8,
		height: 20,
		width: 250,
		//backgroundColor: 'red',
		marginTop: 7,
		fontSize: 16,
		fontFamily: 'SanFranciscoDisplay-Medium',
		color: '#62C6C6'
	},

	bottomButton:{
		position: 'absolute',
		left: 0,
		top: 667-30,
		left: 0,
		right: 0,
		height: 30,
		backgroundColor: '#FFC927',
		justifyContent: 'center',
		alignItems: 'center'
	},

	signoutText:{
		color: 'white',
		backgroundColor: 'transparent',
		textAlign: 'center',
		fontFamily: 'SanFranciscoDisplay-Medium',
		fontSize: 18
	},

	modalContainer:{
		flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	padding: 20,
	},

	alertContainer:{
		height: 120,
		width: 301,
		borderRadius: 6,
		backgroundColor: 'white',
		flexDirection: 'column',
		shadowRadius: 1,
    	shadowOpacity: 0.5,
    	shadowColor: 'black',
    	shadowOffset: {width: 2, height: 1} 
	},

	alertText:{
		marginTop: 8,
		fontSize: 14,
		fontFamily: 'SanFranciscoDisplay-Regular',
		color: '#727272',
		//textAlign: 'center'
	},

	alertChoice:{
		//marginTop: 10,
		fontSize: 18,
		fontFamily: 'SanFranciscoDisplay-Medium',
		textAlign: 'center'
	},

	pwVerifyContainer:{
		height: 205,
		width: 301,
		borderRadius: 6,
		backgroundColor: 'white',
		flexDirection: 'column',
		shadowRadius: 1,
    	shadowOpacity: 0.5,
    	shadowColor: 'black',
    	shadowOffset: {width: 2, height: 1}
	},

	passwordInputContainer:{
		//paddingTop: -5,
		marginTop: 0, 
		marginLeft: 19, 
		width: 262,
		height: 36, 
		borderWidth: 1, 
		borderRadius: 2, 
		borderColor: '#62C6C6',
		justifyContent: 'center'
	},

	forgetPassword:{
		fontSize: 14,
		fontFamily: 'SanFranciscoDisplay-Regular',
		color: '#62C6C6',		
	},

	passwordInput: {
		marginLeft: 10,
		fontSize: 16,
		height: 20,
		width: 200,
		fontFamily: 'SanFranciscoDisplay-Medium',
		color: '#727272',
		//backgroundColor: 'green'
	}

});