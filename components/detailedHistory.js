'use strict';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
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


export default class DetailedHistory extends Component{
    static propTypes = {
    	title: React.PropTypes.string.isRequired,
    	clientData: React.PropTypes.array.isRequired,
    	driver: React.PropTypes.object.isRequired,
    	index: React.PropTypes.number.isRequired
    }; 

    constructor(props){
    	super(props);
    	this.state = {
			rating_starsource: null,  
			start_hour: null,
			start_minute: null,
			end_hour: null,
			end_minute: null,
			start_address: null,
			end_address: null,
			duration: 0,
			dog_number: 1,
			discount: 0,
			credit: 0,
			total: 0,
			unit_price: 0,
			card_info: null, 

    	};
  	}

	componentWillMount(){
		var rating = parseInt(this.props.clientData[this.props.index].service_detail.rated);

        if (rating === 1){
        	this.setState({rating_starsource: require('../ios/one_star.png')});
		}else if(rating === 2){
			this.setState({rating_starsource: require('../ios/two_star.png')});
		}else if(rating === 3){
			this.setState({rating_starsource: require('../ios/three_star.png')});
		}else if(rating === 4){
			this.setState({rating_starsource: require('../ios/four_star.png')});
		}else if(rating === 5){
			this.setState({rating_starsource: require('../ios/five_star.png')});
		};

		var start_time = parseInt(this.props.clientData[this.props.index].start_info.time);
		console.log(start_time);
		var _start_hour = moment(start_time*1000).get('hour').toString();
		this.setState({start_hour: _start_hour});
		console.log(_start_hour);
		var _start_minute = moment(start_time*1000).get('minute').toString();
		this.setState({start_minute:  _start_minute});
		console.log(_start_minute);
		var end_time = parseInt(this.props.clientData[this.props.index].end_info.time)*1000;
		this.setState({end_hour: moment(end_time).get('hour').toString() });
		this.setState({end_minute: moment(end_time).get('minute').toString() });
		this.setState({start_address: this.props.clientData[this.props.index].start_info.address });
		this.setState({end_address: this.props.clientData[this.props.index].end_info.address });
		var _duration = (end_time/1000 - start_time)/(60);
		this.setState({duration: _duration});
		this.setState({total: this.props.clientData[this.props.index].payment_info.Total});
		this.setState({dog_number: this.props.clientData[this.props.index].service_detail.dogs});
		this.setState({discount: this.props.clientData[this.props.index].payment_info.discount});
		this.setState({credit: this.props.clientData[this.props.index].payment_info.credit});
		this.setState({total: this.props.clientData[this.props.index].payment_info.Total});
		this.setState({unit_price: this.props.clientData[this.props.index].payment_info.price_per_dog});
		this.setState({card_info: this.props.clientData[this.props.index].payment_info.card});
	}

	render(){
		return (
		<View style = {styles.container}>
			<View style = {styles.topBarContainer}>
				<TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
					onPress = {Actions.pop}>
					<Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
						source = {require('../ios/goBack.png')}/>
				</TouchableOpacity>
				<Text style = {styles.topBarText}>{this.props.title}</Text>
			</View>
			<ScrollView>
			<View style = {{marginTop: 0, marginLeft:0, height: 145, width: 375}}>
				<View style = {{marginTop:0, marginLeft: 0, height: 106, width: 375, flexDirection: 'row'}}>
					<View style = {{marginTop: 0, marginLeft: 0, width: 147.5, alignItems: 'center'}}>
						<Text style ={[styles.infoText, {marginTop: 56}]}>YOU RATED</Text>
						<Image style ={{marginTop: 4, height: 11, width: 68, resizeMode: 'stretch'}}
							source={this.state.rating_starsource}/>
					</View>
					<View style = {{marginTop: 0, marginLeft: 0, width: 80}}>
						<Image style = {{marginTop: 20, width: 80, height: 80, borderRadius: 40}}
							source = {{uri:'http://36.media.tumblr.com/c1ab83d6816fb7302a230d5ce9580446/tumblr_inline_o3bwh2h8z81sitizh_540.jpg'}}/>
					</View>
					<View style = {{marginTop: 0, marginLeft: 0, width: 147.5, alignItems: 'center'}}>
						<Text style ={[styles.infoText, {marginTop: 56}]}>TOTAL CHARGED</Text>
						<Text style = {[styles.infoText, {marginTop: 0}]}>{"£"+this.props.clientData[this.props.index].payment_info.Total}</Text>
					</View>					
				</View>
				<View style = {{marginTop: 0, marginLeft: 0, height: 39, width: 375}}>
					<Text style = {styles.driverName}>{this.props.driver.last_name}</Text>
				</View>
			</View>
			<View style = {{marginLeft: 0, marginTop: 0, height: 1, width: 375, backgroundColor: '#727272'}}/>
			<View style = {styles.ratingBox}>
				<Text style = {[styles.infoText, {width: 28}, {alignSelf: 'center'}]}>{this.props.driver.Rating}</Text>
				<View style = {{marginTop: 0, marginLeft: 0, width: 1, height: 16, backgroundColor: '#727272'}}/>
				<Image style ={{marginLeft: 1.5, marginTop: 2, height: 12, width: 12}}
						source = {require('../ios/Star.png')}/>
			</View>
			<View style = {{height: 20, width: 375, marginLeft: 0, marginTop: 0, backgroundColor:'white'}}/>
			<View style = {{marginLeft: 19, width: 375, alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row'}}>
				<View style = {{marginLeft: 0, marginTop: 0, height: 10, width: 10, borderRadius: 5, backgroundColor: '#EA4D4E'}}/>
				<View style = {{marginTop: 0, marginLeft: 13, flexDirection: 'row', flexWrap: 'wrap'}}>
					<Text style = {styles.infoTextAddress}>{"Pickup    "}</Text>
					<Text style = {styles.timeInfo}>{this.state.start_hour+':'+this.state.start_minute}</Text>
				</View>
			</View>
			<View style = {{height: 4, width: 375, marginLeft: 0, marginTop: 0, backgroundColor: 'white'}}/>
			<View style = {{marginLeft: 19, marginTop: 0, width: 327, flexWrap: 'wrap', alignItems: 'flex-start'}}>
				<Text style = {[styles.addressText, {marginLeft: 29}]}>{this.state.start_address}</Text>
			</View>
			<View style = {{height: 5, width: 375, marginLeft: 0, marginTop: 0, backgroundColor: 'white'}}/>
			<View style = {{marginLeft: 19, width: 375, alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row'}}>
				<View style = {{marginLeft: 0, marginTop: 0, height: 10, width: 10, borderRadius: 5, backgroundColor: '#FCC31B'}}/>
				<View style = {{marginTop: 0, marginLeft: 13, flexDirection: 'row', flexWrap: 'wrap'}}>
					<Text style = {styles.infoTextAddress}>{"Dropoff    "}</Text>
					<Text style = {styles.timeInfo}>{this.state.end_hour+':'+this.state.end_minute}</Text>
				</View>
			</View>
			<View style = {{height: 4, width: 375, marginLeft: 0, marginTop: 0, backgroundColor: 'white'}}/>
			<View style = {{marginLeft: 19, marginTop: 0, width: 327, flexWrap: 'wrap', alignItems: 'flex-start'}}>
				<Text style = {[styles.addressText, {marginLeft: 29}]}>{this.state.end_address}</Text>
			</View>
			<View style = {{height: 30, width: 375, marginLeft: 0, marginTop: 20, backgroundColor: '#EA4D4E', justifyContent:'center'}}>
				<Text style={styles.receiptInfo}>{this.props.clientData[this.props.index].service_detail.type.toUpperCase() + ' RECEIPT'}</Text>
			</View>
			<View style = {{height: 126, width: 375, marginTop: 0, marginLeft: 0, flexDirection: 'row'}}>
				<View style = {{height: 126, width: 187.5, marginTop: 0, marginLeft: 19, flexDirection: 'column'}}>
					<View style = {{marginLeft: 0, marginTop: 0, flexWrap: 'wrap', flexDirection: 'column', alignItems: 'flex-start'}}>
						<Text style = {[styles.detailText]}>{'Total ' + '(' + 'Unit Price × Dogs' + ')'}</Text>
						<Text style = {[styles.detailText]}>Duration</Text>
						<Text style = {[styles.detailText]}>Discount</Text>
						<Text style = {[styles.detailText]}>Credit</Text>
					</View>
				</View>
				<View style = {{height: 126, width: 149.5, marginTop: 0, marginLeft: 0, flexDirection: 'column'}}>
					<View style = {{marginLeft: 0, marginTop: 0, flexWrap: 'wrap', flexDirection: 'column', alignItems: 'flex-end'}}>
						<Text style = {[styles.detailText, {justifyContent: 'flex-end'}]}>{'£' + this.state.unit_price + ' × ' + this.state.dog_number + ' Dogs'}</Text>
						<Text style = {[styles.detailText, {justifyContent: 'flex-end'}]}>{this.state.duration + ' min'}</Text>
						<Text style = {[styles.detailText, {justifyContent: 'flex-end'}]}>{this.state.discount + '%'}</Text>
						<Text style = {[styles.detailText, {justifyContent: 'flex-end'}]}>{'-£' + this.state.credit}</Text>
					</View>
				</View>
			</View>					
			<View style = {{marginLeft: 0, marginTop: 0, height: 1, width: 375, backgroundColor: '#727272'}}/>
			<View style = {{marginTop: 0, marginLeft: 19, width: 337, height: 78, flexDirection: 'row'}}>
				<View style = {{marginLeft: 0, width: 168.5, height: 68, flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start' }}>
					<Text style = {[styles.priceText, {color: '#727272'}]}>Grand Total</Text>
					<View style = {{flexDirection: 'row'}}>
						<Image style = {{marginTop: 10, height: 19, width: 32}}
							source = {require('../ios/Visa-dark.png')}/>
						<Text style = {[styles.priceText, {color: '#727272'}]}>{" "+this.state.card_info}</Text>
					</View>
				</View>	
				<View style = {{marginLeft: 0, width: 168.5, height: 68, flexDirection: 'column', alignItems: 'flex-end'}}>
					<Text style = {[styles.priceText, {color: '#727272'}]}>{'£' + this.state.total}</Text>
					<Text style = {[styles.priceText, {color: '#EA4D4E'}]}>{'£' + this.state.total}</Text>
				</View>
			</View>
			<TouchableHighlight style = {styles.buttonHelp} underlayColor={'#B6B6B6'} activeOpacity = {0.6}
				onPress = {()=>console.log('pressed')}>
				<Text style = {styles.buttonHelpText}>NEED HELP?</Text>
			</TouchableHighlight>
			<TouchableOpacity style = {styles.bottomButton} activeOpacity = {0.9}>
				<Text style = {[styles.receiptInfo, {marginTop: 2}]}>Pricing FAQ & Help Center</Text>
			</TouchableOpacity>	
			</ScrollView>
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

	driverName:{
		textAlign: 'center',
		marginTop: 0,
		fontSize: 14,
		fontFamily: 'SanFranciscoDisplay-Medium',
		color: '#727272',
		backgroundColor: 'transparent'
	},

	infoText:{
		textAlign: 'center',
		fontSize: 14,
		fontFamily: 'SanFranciscoDisplay-Regular',
		color: '#727272',
		backgroundColor: 'transparent'
	},

	ratingBox:{
		position: 'absolute',
		top: 86,
		left: 166,
		width: 44,
		height: 16,
		backgroundColor: 'white',
		borderRadius: 1,
		shadowRadius: 0.1,
    	shadowOpacity: 0.5,
		shadowColor: 'gray',
		shadowOffset: {width: 0, height: 0.5},
		flexDirection: 'row'
	},

	receiptInfo:{
		color: 'white',
		backgroundColor: 'transparent',
		textAlign: 'center',
		fontFamily: 'SanFranciscoDisplay-Medium',
		fontSize: 18
	},

	infoTextAddress:{
		textAlign: 'center',
		fontSize: 16,
		fontFamily: 'SanFranciscoDisplay-Medium',
		color: '#727272',
		backgroundColor: 'transparent'
	},

	timeInfo: {
		color: '#B6B6B6',
		fontFamily: 'SanFranciscoDisplay-Regular',
		fontSize: 16,
		textAlign: 'center',
		backgroundColor: 'transparent'
	},

	addressText:{
		color: '#727272',
		fontFamily: 'SanFranciscoDisplay-Regular',
		fontSize: 14,
		textAlign: 'center',
		backgroundColor: 'transparent'
	},

	detailText:{
		color: '#727272',
		fontFamily: 'SanFranciscoDisplay-Regular',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 10
	},

	priceText: {
		//color: '#727272',
		fontFamily: 'SanFranciscoDisplay-Medium',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 10		
	},

	buttonHelp:{
		borderWidth: 1,
		borderColor: '#727272',
		alignSelf:'center',
		marginTop: 10,
		width: 142,
		height: 27,
		backgroundColor: 'transparent',
		justifyContent: 'center'
	},

	buttonHelpText: {
		fontSize: 16,
		fontFamily: 'SanFranciscoDisplay-Regular',
		color: '#727272',
		textAlign: 'center',
		backgroundColor: 'transparent',
		alignItems: 'center'
	},

	bottomButton:{
		marginTop: 25,
		marginLeft: 0,
		width: 375,
		height: 30,
		backgroundColor: '#FFC927'
	}
});