'use strict';

import {Actions} from 'react-native-router-flux';

import React, {
  Component,
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
  PropTypes,
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

var PaymentPage = React.createClass({

	getInitialState: function(){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
          	dataSource: ds.cloneWithRows([ dataset[0], dataset[1], dataset[2], dataset[3] ]),
        };
	},

	componentWillMount: function(){
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
	},


	_renderRow: function(rowData: string, sectionID: number, rowID: number, _rowData: string){
		var _row = parseInt(rowData) - 1;
		console.log(_row);
		var _last_four_digit = detail[_row].detail.card_number.substr(detail[_row].detail.card_number.length - 4);
		return(
			<View style = {styles.cellsContainer}>
				<TouchableOpacity style = {{height: 50, marginLeft: 0, marginTop: 0, flexDirection: 'row', alignItems: 'center'}} 
					activeOpacity = {0.9}
					onPress = {()=>Actions.editPayment({cardDetail:detail[_row].detail})}>
					<Image style = {{marginLeft: 19, height: 20, width: 34, resizeMode: 'stretch'}}
						source = {detail[_row].detail.icon}/>
					<Text style = {[styles.cardNumber, {color: '#727272'}]}>{"••••   " + _last_four_digit}</Text>
				</TouchableOpacity>
				<View style = {{height: 1, marginTop: 0, marginLeft: 0, width: 375, backgroundColor: '#B6B6B6'}}/>
			</View>
			)
	},

	render(){
		return (
		<View style = {styles.container}>
			<View style = {styles.topBarContainer}>
				<TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
					onPress = {Actions.pop}>
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
          	<TouchableOpacity style = {[styles.cellsContainer, {height:50, flexDirection: 'row', alignItems: 'center'}]}
          		activeOpacity = {0.9}
          		onPress = {()=>Actions.addPayment()}>
				<Image style = {{marginLeft: 19, height: 20, width: 34, resizeMode: 'stretch'}}
						source = {require('../ios/add.png')}/>
          		<Text style = {[styles.cardNumber, {color: '#EA4D4E'}]}>Add Payment</Text>
          	</TouchableOpacity>
          	<View style = {{height: 1, marginTop: 0, marginLeft: 0, width: 375, backgroundColor: '#B6B6B6'}}/>
		</View>
	)}
})


var styles = React.StyleSheet.create({
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
		height: 71,
		width: 375,
		backgroundColor: '#EA4D4E',
		alignItems: 'center',
		flexDirection: 'row',
    	shadowRadius: 0.5,
    	shadowOpacity: 0.5,
    	shadowColor: 'gray',
    	shadowOffset: {width: 0, height: 1}
	},

	topBarText:{
        marginTop: 15,
        marginLeft: 120,
        color: 'white',
        fontSize: 18,
        fontFamily: 'SanFranciscoDisplay-Medium',
        backgroundColor: 'transparent',
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

module.exports = PaymentPage;