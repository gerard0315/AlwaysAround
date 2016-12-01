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
  //PropTypes,
} from 'react-native';


export default class AddPaymentPage extends Component{
    constructor(props){
    	super(props);
    	this.state = {
        	cardNumber: null,
        	cardNumberText: "",
        	expiryDate: "",
        	dateColor: "#727272",
        	cvv: 0,
        	postCode: "",
        	buttonOpacity: 0.5,
    	};
  	}

	onInputCardNumber(event){
		var previousState = this.state.cardNumberText;
		this.setState({cardNumberText: event.nativeEvent.text});
		var thisState = this.state.cardNumberText;

		if(previousState.length < thisState.length && thisState.length === 4){
			this.setState({cardNumberText: this.state.cardNumberText + " "});
		}else if(previousState.length < thisState.length && thisState.length === 9){
			this.setState({cardNumberText: this.state.cardNumberText + " "});
		}else if(previousState.length < thisState.length && thisState.length === 14){
			this.setState({cardNumberText: this.state.cardNumberText + " "});			
		}else if(previousState.length > thisState.length && thisState.length === 5){
			var str = this.state.cardNumberText;
			var res = str.replace(" ", "");
			console.log(res);
			this.setState({cardNumberText: res});
		}else if(previousState.length > thisState.length && thisState.length === 10){
			var str = this.state.cardNumberText;
			str = str.substring(0, 9);
			this.setState({cardNumberText: str});
		}else if(previousState.length > thisState.length && thisState.length === 15){
			var str = this.state.cardNumberText;
			str = str.substring(0, 14);
			this.setState({cardNumberText: str});
		}else{
			this.setState({cardNumberText: this.state.cardNumberText});
		};
		
		if(thisState.length === 0){
			this.setState({buttonOpacity: 0.5});
		}else if(thisState.length !== 0){
			this.setState({buttonOpacity: 1})
		};
	}

	onInputExpiryDate(event){
		var previousState = this.state.expiryDate;
		this.setState({expiryDate: event.nativeEvent.text});
		var thisState = this.state.expiryDate;

		if(previousState.length < thisState.length && thisState.length === 2){
			this.setState({expiryDate: this.state.expiryDate + "/"});
		}else if(previousState.length < thisState.length && thisState.length === 3){
			var str = this.state.expiryDate;
			str = str.substring(0, 2);
			this.setState({expiryDate: str});
		}else{
			this.setState({expiryDate: this.state.expiryDate});
		};

		var month = parseInt(thisState.substring(0,2));
		var year = parseInt(thisState.substring(3, 5));
		if (month === 0 || month > 12){
			this.setState({dateColor: 'red'});
		}else if(thisState.length === 5 && year < 16){
			this.setState({dateColor: 'red'});
		}else{
			this.setState({dateColor: '#727272'});
		};

	}

	onInputPostCode(event){
		this.setState({postCode: event.nativeEvent.text.toUpperCase()});
	}

	onInputCCV(event){
		this.setState({ccv: event.nativeEvent.text});	
	}

	onBack(){
		Actions.myDogs({type: ActionConst.BACK});
	}

	render(){
		return(
		<ScrollView style = {styles.container} scrollEnabled={false}>
			<View style = {styles.topBarContainer}>
				<TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
					onPress = {this.onBack}>
					<Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
						source = {require('../ios/goBack.png')}/>
				</TouchableOpacity>
				<Text style = {styles.topBarText}>Add Payment</Text>
			</View>
			<View style = {{marginTop: 20, marginLeft: 19, width: 337, height: 102, backgroundColor: 'white'}}>
				<View style = {{marginTop: 0, marginLeft: 0, width: 337, height: 102, borderRadius: 2, backgroundColor: '#DEDEDE'}}>
					<View style = {styles.cardNumberContainer}>
						<TextInput style = {styles.cardNumberInput}
							placeholder = {"1234 1234 1234 1234"}
							placeholderTextColor = {"#B6B6B6"}
							keyboardType = {"numeric"}
							maxLength = {20}
							value = {this.state.cardNumberText}
							onChange = {this.onInputCardNumber.bind(this)}
							/>
						<Image style = {{marginLeft: 10, height: 20, width: 29, resizeMode: 'stretch'}}
							source = {require('../ios/card_type.png')}/>
					</View>
					<View style = {styles.cardDetailContainer}>
						<View style = {styles.detailInputPadding}>
							<TextInput style = {[styles.detailInput, {color: this.state.dateColor}]}
								placeholder = {"MM/YY"}
								placeholderTextColor = {"#B6B6B6"}
								keyboardType = {"numeric"}
								maxLength = {5}
								value = {this.state.expiryDate}
								onChange = {this.onInputExpiryDate.bind(this)}
							/>
						</View>
						<View style = {{marginLeft: 0, marginTop: 0, height: 36, width: 10, backgroundColor: 'transparent'}}/>
						<View style = {styles.detailInputPadding}>
							<TextInput style = {[styles.detailInput, {color: '#727272'}]}
								placeholder = {"CVV"}
								placeholderTextColor = {"#B6B6B6"}
								maxLength = {3}
								keyboardType = {"numeric"}
								value = {this.state.cvvValue}
								onChange = {this.onInputCCV.bind(this)}
							/>
						</View>
						<View style = {{marginLeft: 0, marginTop: 0, height: 36, width: 10, backgroundColor: 'transparent'}}/>
						<View style = {styles.detailInputPadding}>
							<TextInput style = {[styles.detailInput, {color: '#727272'}]}
								placeholder = {"Post Code"}
								placeholderTextColor = {"#B6B6B6"}
								//maxLength = {3}
								value = {this.state.postCode}
								onChange = {this.onInputPostCode.bind(this)}
							/>
						</View>
					</View>
				</View>
			</View>
			<Image style = {{marginTop: 11, marginLeft: 19, width: 337}}
				source = {require('../ios/OR_gray.png')}/>
			<TouchableOpacity style = {{marginTop: 10, marginLeft: 19, width: 337, height: 46}}>
				<Image style = {{marginTop: 0, marginLeft: 0, width: 337, height: 46, resizeMode: 'stretch'}}
					source = {require('../ios/add_paypal.png')}/>
			</TouchableOpacity>
			<TouchableOpacity style = {{marginTop: 312, marginLeft: 19, width: 337, height: 46, backgroundColor: 'white'}}
				activeOpacity = {0.9}>
				<Image style = {{marginTop: 0, marginLeft: 0, width: 337, height: 46, resizeMode: 'stretch', opacity: this.state.buttonOpacity}}
					source = {require('../ios/save.png')}/>
			</TouchableOpacity>
			<View style = {{marginTop: 10, alignSelf: 'center', width: 310, height: 24}}>
				<Image style = {{marginTop: 0, marginLeft: 0, width: 310, height: 24, resizeMode: 'stretch'}}
					source = {require('../ios/This_payment_method.png')}/>
			</View>

		</ScrollView>
		)

	}
}

var styles =StyleSheet.create({
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
		alignItems: 'center',
		flexDirection: 'row',
    	shadowRadius: 0.6,
    	shadowOpacity: 0.2,
    	shadowColor: 'gray',
    	shadowOffset: {width: 0, height: 0.5}
	},

	topBarText:{
        marginTop: 10,
        marginLeft: 95,
        color: 'white',
        fontSize: 20,
        fontFamily: 'SanFranciscoDisplay-Medium',
        backgroundColor: 'transparent',
	},

	cardNumberContainer:{
		marginLeft: 10,
		marginTop: 10,
		width: 317,
		height: 36,
		borderRadius: 2,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},

	cardDetailContainer:{
		marginLeft: 10,
		marginTop: 10,
		width: 317,
		height: 36,
		//backgroundColor: 'green',
		flexDirection: 'row'
	},

	detailInputPadding: {
		marginLeft: 0,
		marginTop: 0,
		height: 36,
		width: 99,
		backgroundColor: 'white',
		borderRadius: 2
	},

	cardNumberInput: {
		alignSelf: 'center',
		marginLeft: 8,
		width: 258,
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
	}
});

module.exports = AddPaymentPage;