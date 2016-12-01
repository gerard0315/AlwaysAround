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
	Modal,
} from 'react-native';


export default class EditPaymentPage extends Component{
    static propTypes = {
        cardDetail: React.PropTypes.object.isRequired,
    }; 

    constructor(props){
    	super(props);
    	this.state = {
        	cardNumber: null,
        	cardNumberText: null,
        	cardNumberCache: null,
        	expiryDate: null,
        	cvv: 0,
        	icon: require('../ios/card_type.png'),
        	lastFourDigit: null,
        	postCode: null,
        	dateColor: '#727272',
        	modalVisible: false,

    	};
  	}

	onInputCardNumber(event){
		this.setState({cardNumberText: event.nativeEvent.text});
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

	componentWillMount(event){
		console.log(this.props.cardDetail);
		var card = this.props.cardDetail;
		if(card.type === "visa"){
			this.setState({icon: require('../ios/Visa-dark.png')});
		}else if(card.type === "master"){
			this.setState({icon: require('../ios/MasterCard-dark.png')});
		}else if(card.type === "express"){
			this.setState({icon: require('../ios/AmericanExpress-dark.png')});
		}else if(card.type === "paypal"){
			this.setState({icon: require('../ios/Paypal-dark.png')});
		};
		var _cardNumber = card.card_number;
		var len = _cardNumber.length;
		var str = _cardNumber.substr(len - 4);
		this.setState({lastFourDigit: str});
		this.setState({expiryDate: card.expiry_date});
		this.setState({cvv: card.cvv});
		this.setState({postCode: card.post_code});
	}

	_setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	onDeleteMethod(event){
		this._setModalVisible(false);
		Actions.pop();
	}

	onFocus(){

	}

	onBlur(){

	}

	onInputCCV(event){
		this.setState({ccv: event.nativeEvent.text});	
	}

	onBack(){
		Actions.paymentPage({type: ActionConst.BACK});
	}

	render(){
	    var modalBackgroundStyle = {
	      backgroundColor: 'rgba(0, 0, 0, 0.8)',
	    };
	    return(
		<ScrollView style = {styles.container} scrollEnabled={false}>
	        <Modal
	          animationType={'fade'}
	          transparent={true}
	          visible={this.state.modalVisible}
	          onRequestClose={() => {this._setModalVisible.bind(this, false)}}
	          >
	          <View style={[styles.modalContainer, modalBackgroundStyle]}>
	          	<View style = {styles.alertContainer}>
	          		<View style = {{marginTop: 0, marginLeft: 0, width: 301, height: 62, flexWrap: 'wrap', justifyContent: 'center'}}>
	          			<Text style = {styles.alertText}>Are you sure you want to delete this payment method?</Text>
	          		</View>
	          		<View style = {{height: 1, backgroundColor: '#B6B6B6', width: 301, marginTop: 0, marginLeft: 0}}/>
	          		<View style = {{height: 43, marginTop: 0, marginLeft: 0, width: 301, flexDirection: 'row', alignItems: 'center'}}>
	          			<TouchableOpacity style = {{marginLeft: 0, marginTop: 0, width: 150, height: 43, justifyContent:'center'}}
	          				onPress= {this.onDeleteMethod.bind(this, false)}>
	          				<Text style = {[styles.alertChoice, {color: '#EA4D4E'}]}>DELETE</Text>
	          			</TouchableOpacity>
	          			<View style = {{height: 43, width: 1, marginLeft: 0, marginTop: 0, backgroundColor: '#B6B6B6'}}/>
	          			<TouchableOpacity style = {{marginLeft: 0, marginTop: 0, width: 150, height: 43, justifyContent: 'center'}}
	          				onPress= {()=>this._setModalVisible.bind(this, false)}>
	          				<Text style = {[styles.alertChoice, {color: '#727272'}]}>CANCEL</Text>
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
				<Text style = {styles.topBarText}>Edit Payment</Text>
			</View>
			<View style = {{marginTop: 20, marginLeft: 19, width: 337, height: 102, backgroundColor: 'white'}}>
				<View style = {{marginTop: 0, marginLeft: 0, width: 337, height: 102, borderRadius: 2, backgroundColor: '#B6B6B6'}}>
					<View style = {styles.cardNumberContainer}>
						<Text style = {styles.cardNumberInput}>{"••••  ••••  ••••  " + this.state.lastFourDigit}</Text>
						<Image style = {{marginLeft: 10, height: 20, width: 29, resizeMode: 'stretch'}}
							source = {this.state.icon}/>
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
								onFocus = {this.onFocus.bind(this)}
								onBlur = {this.onBlur.bind(this)}
							/>
						</View>
						<View style = {{marginLeft: 0, marginTop: 0, height: 36, width: 10, backgroundColor: 'transparent'}}/>
						<View style = {styles.detailInputPadding}>
							<TextInput style = {[styles.detailInput, {color: '#727272'}]}
								placeholder = {"CVV"}
								placeholderTextColor = {"#B6B6B6"}
								keyboardType = {"numeric"}
								maxLength = {3}
								value = {this.state.cvvValue}
								onChange = {this.onInputCCV.bind(this)}
								onFocus = {this.onFocus.bind(this)}
								onBlur = {this.onBlur.bind(this)}
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
								onFocus = {this.onFocus.bind(this)}
								onBlur = {this.onBlur.bind(this)}
							/>
						</View>
					</View>
				</View>
			</View>
			<TouchableOpacity style = {{marginTop: 8, marginLeft: 19, width: 337, height: 46}}>
				<Image style = {{marginTop: 0, marginLeft: 0, width: 337, height: 46, resizeMode: 'stretch'}}
					source = {require('../ios/save.png')}/>
			</TouchableOpacity>
			<TouchableOpacity style = {{marginTop: 330, marginLeft: 19, width: 337, height: 46}}
				onPress={this._setModalVisible.bind(this, true)}>
				<Image style = {{marginTop: 0, marginLeft: 0, width: 337, height: 46, resizeMode: 'stretch'}}
					source = {require('../ios/delete.png')}/>
			</TouchableOpacity>
			<TouchableOpacity style = {{marginTop: 10, alignSelf: 'center', width: 310, height: 24}}>
				<Image style = {{marginTop: 0, marginLeft: 0, width: 310, height: 24, resizeMode: 'stretch'}}
					source = {require('../ios/This_payment_method.png')}/>
			</TouchableOpacity>

		</ScrollView>
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

	modalContainer:{
		flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	padding: 20,
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
		backgroundColor: '#B6B6B6',
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
		color: 'white'
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
		textAlign: 'center'
	},

	alertChoice:{
		fontSize: 18,
		fontFamily: 'SanFranciscoDisplay-Medium',
		textAlign: 'center'
	}
});