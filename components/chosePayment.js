'use strict';
import React, {Component, PropTypes} from 'react';
import {Actions, ActionConst} from 'react-native-router-flux';

import {
  StyleSheet,
  MapView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Navigator,
  ListView,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

var dataset = [
	"1",
	"2",
	"3",
	"4",
];

var detail = [
	{
		"index":"1",
		"detail":{
			"type": "visa",
			"card_number": "1111111111113333",
			"icon" : null,
			"ccv": 123,
			"post_code": "L3 5XA",
			"expiry_date": "07/17"
		},
	},
	{
		"index":"2",
		"detail":{
			"type": "master",
			"card_number": "2222222222224444",
			"icon" : null,
			"ccv": 123,
			"post_code": "WC1N 1AS",
			"expiry_date": "07/18"
		}
	},
	{
		"index":"3",
		"detail":{
			"type": "express",
			"card_number": "3333333333335555",
			"icon" : null,
			"ccv": 123,
			"post_code": "NW1 6DP",
			"expiry_date": "08/19"
		}
	},
	{
		"index":"4",
		"detail":{
			"type": "paypal",
			"card_number": "    .com",
			"icon" : null,
		}
	},

];

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class SelectPaymentPage extends Component{
  static propTypes = {
        service: React.PropTypes.object.isRequired,
        location: React.PropTypes.string.isRequired,
        lng: React.PropTypes.number.isRequired,
        lat: React.PropTypes.number.isRequired,
        infoData: React.PropTypes.array.isRequired,
        time: React.PropTypes.number.isRequired,
        paymentType: React.PropTypes.number.isRequired,
        data: React.PropTypes.object.isRequired,
    }; 

  	constructor(props){
    	super(props);
    	this.state = {
        	dataSource: ds.cloneWithRows([ dataset[0], dataset[1], dataset[2], dataset[3] ]),
    	};
  	}

	componentWillMount(){
		console.log(" in payment ");
		var len = detail.length;
		console.log(len);
		for (var i = 0; i< len; i ++){
			if (detail[i].detail.type === "visa"){
				detail[i].detail.icon = require('../ios/Visa-dark.png');
			}else if(detail[i].detail.type === "master"){
				detail[i].detail.icon = require('../ios/MasterCard-dark.png');
			}else if(detail[i].detail.type === "express"){
				detail[i].detail.icon = require('../ios/AmericanExpress-dark.png');
			}else if(detail[i].detail.type === "paypal"){
				detail[i].detail.icon = require('../ios/Paypal-dark.png');
			}
		};
	}

	componentWillUnmount(){
		//this.setState({dataSource: []});
		console.log("choose payment unmounted");
	}

	onPressCell(_row){
	  Actions.refresh({key: 'confirm', paymentType: _row + 1 });
     /*Actions.confirm({
        lat: this.props.lat, 
        lng: this.props.lng, 
        location: this.props.location, 
        service: this.props.service, 
        infoData: this.props.infoData, 
        time: this.props.time,
        paymentType: _row + 1,
        data: this.props.data,
        type: ActionConst.REFRESH,
    	});	
    	*/
    	
	}


	_renderRow = (rowData: string, sectionID: number, rowID: number, _rowData: string) => {
		var _row = parseInt(rowData) - 1;
		console.log(_row);
		var _last_four_digit = detail[_row].detail.card_number.substr(detail[_row].detail.card_number.length - 4);
		return(
			<View style = {styles.cellsContainer}>
				<TouchableOpacity style = {{height: 50, marginLeft: 0, marginTop: 0, flexDirection: 'row', alignItems: 'center'}} 
					activeOpacity = {0.9}
					onPress = {this.onPressCell.bind(this, _row)}>
					<Image style = {{marginLeft: 19, height: 20, width: 34, resizeMode: 'stretch'}}
						source = {detail[_row].detail.icon}/>
					<Text style = {[styles.cardNumber, {color: '#727272'}]}>{"••••   " + _last_four_digit}</Text>
				</TouchableOpacity>
				<View style = {{height: 1, marginTop: 0, marginLeft: 0, width: 375, backgroundColor: '#B6B6B6'}}/>
			</View>
			)
	}

	render(){
		return (
		<View style = {styles.container}>
			<View style = {styles.topBarContainer}>
				<TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
					onPress = {Actions.pop()}>
					<Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
						source = {require('../ios/goBack.png')}/>
				</TouchableOpacity>
				<Text style = {styles.topBarText}>Payment</Text>
			</View>
			<View>
				<ListView style = {styles.cellsContainer}
			        dataSource={this.state.dataSource}
          			renderRow={this._renderRow}/>
          	</View>
		</View>
	)}
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
		alignItems: 'center',
		flexDirection: 'row',
    	shadowRadius: 0.6,
    	shadowOpacity: 0.2,
    	shadowColor: 'gray',
    	shadowOffset: {width: 0, height: 0.5}
	},

	topBarText:{
        marginTop: 10,
        marginLeft: 115,
        color: 'white',
        fontSize: 20,
        fontFamily: 'SanFranciscoDisplay-Medium',
        backgroundColor: 'transparent',
        //backgroundColor: 'green'
	},

	cellContainer:{
		marginTop: 1,
		marginLeft: 0,
		width: 375,
		height: 50,
	},

	cardNumber: {
		//color: '#727272',
		fontFamily: 'SanFranciscoDisplay-Medium',
		fontSize: 18,
		marginLeft: 14
	},
});