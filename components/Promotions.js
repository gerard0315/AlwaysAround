'use strict';

import {Actions, ActionConst} from 'react-native-router-flux';
import React, {Component, PropTypes} from 'react';
import {
  //Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Navigator,
  ListView,
  TextInput,
  ScrollView,
  //import React, {Component, PropTypes} from 'react';PropTypes,
  Modal,
} from 'react-native';
import Share from 'react-native-share';

export default class PromotionsPage extends Component{

    constructor(props){
    	super(props);
    	this.state = {
    		code: null,
    		modalVisible: false,
    	};
  	};

  	onPress() {
  		console.log('hiiiiiiiiiiiiiii');
  	}

	_setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	onShare() {
	    Share.open({
			title: "React Native",
      		message: "Hola mundo",
      		url: "http://facebook.github.io/react-native/",
      		subject: "Share Link" //  for email
	    },(e) => {
	      console.log(e);
	    });
	}

	onBack(){
		Actions.home({type: ActionConst.BACK});
	}

	render(){
		var modalBackgroundStyle = {
	      backgroundColor: 'rgba(0, 0, 0, 0.8)',
	    };
		return (
		<View style = {styles.container}>
	        <Modal
	          animationType={'slide'}
	          transparent={true}
	          visible={this.state.modalVisible}
	          onRequestClose={() => {this._setModalVisible(false)}}
	          >
	          <View style={[styles.modalContainer, modalBackgroundStyle]}>
	          	<View style = {styles.alertContainer}>
	          		<View style = {{marginTop: 0, marginLeft: 0, width: 301, height: 62, flexWrap: 'wrap', justifyContent: 'center'}}>
	          			<Text style = {styles.alertText}>£15 credit has been added to your account. Let's start a booking!</Text>
	          		</View>
	          		<View style = {{height: 1, backgroundColor: '#B6B6B6', width: 301, marginTop: 0, marginLeft: 0}}/>
	          		<View style = {{height: 43, marginTop: 0, marginLeft: 0, width: 301, flexDirection: 'row', alignItems: 'center'}}>
	          			<TouchableOpacity style = {{marginLeft: 0, marginTop: 0, width: 301, height: 43, justifyContent:'center', alignItems: 'center'}}
	          				onPress= {this._setModalVisible.bind(this, false)}>
	          				<Text style = {[styles.alertChoice, {color: '#62C6C6'}]}>CONGRATULATION</Text>
	          			</TouchableOpacity>
	          		</View>
	          	</View>
	          </View>
	        </Modal>
			<View style = {styles.topBarContainer}>
				<TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
					onPress = {this.onBack}>
					<Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
						source = {require('../ios/goBack.png')}/>
				</TouchableOpacity>
				<Text style = {styles.topBarText}>Promotions</Text>
			</View>

			<View style = {{marginTop: 20, marginLeft: 19, width: 337, height: 102, backgroundColor: 'white'}}>
				<View style = {{marginTop: 0, marginLeft: 0, width: 337, height: 102, borderRadius: 2, backgroundColor: '#DEDEDE'}}>
					<View style = {styles.codeInputContainer}>
						<Image style = {{height: 16, width: 20, marginLeft: 10}}
							source = {require('../ios/promotion.png')}/>
						<TextInput style = {[styles.codeInput]}
							placeholder = {"Enter a promotion code"}
							placeholderTextColor = {"#B6B6B6"}
							keyboardType = {"numeric"}
							maxLength = {20}
							value={this.state.code}
              				onChange = {this.onCodeInput}
							/>
					</View>
					<View style = {styles.cardDetailContainer}>
						<TouchableOpacity style = {{marginTop: 0, marginLeft: 0, height: 36, width: 317, backgroundColor: '#62C6C6', borderRadius: 2, alignItems: 'center', justifyContent: 'center'}}
							activeOpacity = {0.9} onPress={this._setModalVisible.bind(this, true)}
							>
							<Text style = {styles.buttonApply}>APPLY</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<Image style = {{marginTop: 11, marginLeft: 19, width: 337}}
				source = {require('../ios/OR_gray.png')}/>
			<View style = {{marginTop: 10, width: 80, height: 80, alignSelf: 'center'}}>
				<Image style = {{marginTop: 0, marginLeft: 0, width: 80, height: 80, resizeMode: 'stretch'}}
					source = {require('../ios/gift.png')}/>
			</View>
			<Text style = {styles.saleText}>Give £15 and get £15</Text>
			<Text style = {[styles.detailText, {color: '#727272'}]}>Give friend £15 towards their first booking, and earn £15 when they complete their first AA service.
				<Text style = {[styles.detailText, {color: '#EA4D4E'}]} onPress = {this.onPress}> Details.</Text>
			</Text>
			<Text style = {styles.share}>Share your promo code now</Text>
			<TouchableOpacity style = {styles.buttonShare} activeOpacity = {0.9} onPress={this.onShare}>
				<Text style = {styles.codeText}>LUNABS1</Text>
				<Image style = {{marginLeft: 47, height: 16, width: 28, resizeMode: 'stretch'}}
					source = {require('../ios/send.png')}/>
			</TouchableOpacity>
		</View>
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
    	shadowOpacity: 0.5,
    	shadowColor: 'gray',
    	shadowOffset: {width: 0, height: 0.5}
	},

	topBarText:{
        marginTop: 10,
        marginLeft: 105,
        color: 'white',
        fontSize: 20,
        fontFamily: 'SanFranciscoDisplay-Medium',
        backgroundColor: 'transparent',
	},

	codeInputContainer:{
		marginLeft: 10,
		marginTop: 10,
		width: 317,
		height: 36,
		borderRadius: 2,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		//justifyContent: 'center'
	},

	cardDetailContainer:{
		marginLeft: 10,
		marginTop: 10,
		width: 317,
		height: 36,
		//backgroundColor: 'green',
		flexDirection: 'row'
	},


	codeInput: {
		alignSelf: 'center',
		marginLeft: 8,
		width: 200,
		height: 20,
		fontSize: 16,
		fontFamily: 'SanFranciscoDisplay-Medium',
		color: '#727272'
	},

	detailInput:{
		textAlign: 'center',
		alignSelf: 'center',
		fontSize: 16,
		height: 20,
		width: 99,
		marginTop: 8,
		//marginLeft: 8,
		fontFamily: 'SanFranciscoDisplay-Medium',
		//color: '#727272'
	},

	buttonApply:{
		textAlign: 'center',
		alignSelf: 'center',
		fontSize: 20,
		color: 'white',
		//marginLeft: 8,
		fontFamily: 'SanFranciscoDisplay-Medium',	
	},

	saleText: {
		marginTop: 20,
		textAlign: 'center',
		alignSelf: 'center',
		fontSize: 18,
		color: '#EA4D4E',
		fontFamily: 'SanFranciscoDisplay-Medium',
	},

	detailText: {
		marginTop: 10,
		flexWrap: 'wrap',
		width: 284,
		textAlign: 'center',
		alignSelf: 'center',
		fontSize: 14,
		//color: '#727272',
		fontFamily: 'SanFranciscoDisplay-Regular',
	},

	share:{
		marginTop: 20,
		flexWrap: 'wrap',
		textAlign: 'center',
		alignSelf: 'center',
		fontSize: 16,
		color: '#62C6C6',
		fontFamily: 'SanFranciscoDisplay-Medium',
	},

	buttonShare:{
		marginTop: 5,
		width: 260,
		height: 46,
		//justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#62C6C6',
		alignSelf: 'center',
		borderRadius: 6,
	},

	codeText:{
		marginLeft: 90,
		flexWrap: 'wrap',
		textAlign: 'center',
		alignSelf: 'center',
		fontSize: 20,
		color: 'white',
		fontFamily: 'SanFranciscoDisplay-Medium',		
	},

	modalContainer:{
		flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	padding: 20,
	},

	alertContainer:{
		height: 106,
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
		fontSize: 14,
		fontFamily: 'SanFranciscoDisplay-Regular',
		color: '#727272',
		textAlign: 'center',
		width: 240,
		flexWrap: 'wrap',
		alignSelf:'center'
	},

	alertChoice:{
		fontSize: 18,
		fontFamily: 'SanFranciscoDisplay-Medium',
		textAlign: 'center'
	}
});
