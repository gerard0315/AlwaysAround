'use strict';
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, ScrollView} from 'react-native';
import moment from 'moment';

var dataset = [
	"000001",
	"000002",
	"000003"
];

var receiptData = [
	{
	"ID":"000001",
	"start_info": {
		"time": "1466425985",
		"address": "Aldgate East Station, E1 8FA"
	},
	"end_info": {
		"time": "1466428805",
		"address": "Stepney Green Station, E1 3FD"
	},
	"service_detail":{
		"type": "AA Shelter",
		"dogs": "2",
		"driver": "23",
		"rated": "5"
	},
	"payment_info":{
		"price_per_dog": "20",
		"discount": "0",
		"credit": "20",
		"payment": "1",
		"Total": "20",
		'type': "visa",
		"card": "*1006",
	},
	}
];

var driverData = {
	"driverID": "23",
	"last_name": "Smith",
	"first_name": "John",
	"Rating": "4.7",
};


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class HistoryPage extends Component{
    constructor(props){
    	super(props);
    	this.state = {
          	dataSource: ds.cloneWithRows([dataset[0], dataset[1], dataset[2]]),
           	dateText: '',
        	timeText: '',
        	durationText: '',
        	nowDate: 0,
        	nowMonth: 0,

    	};
  	}

	componentWillMount(){
		var now = Date.now();
		var _now_date = moment(now).get('date');
		var _now_month = moment(now).get('month');
		//console.log(_now_date);
		this.setState({nowDate: _now_date});
		this.setState({nowMonth: _now_month});
	  }

	toDetail(passToNext){
		//console.log(passToNext);
		console.log(".................................");
		Actions.detailHistory({title: passToNext});
	}

	_renderRow = (rowData: string, sectionID: number, rowID: number, _rowData: string) =>{
		var row = parseInt(dataset[0]) - 1;
		var result = receiptData[row].ID;
		var charge = receiptData[row].payment_info.Total;
		var serviceType = receiptData[row].service_detail.type;
		var timeStart = parseInt(receiptData[row].start_info.time)* 1000;
		var hour = moment(timeStart).get('hour').toString();
		var minute = moment(timeStart).get('minute').toString();
		var addressStart = receiptData[row].start_info.address;
		var timeEnd = parseInt(receiptData[row].end_info.time)* 1000;
		var addressEnd = receiptData[row].end_info.address;
		var date = moment(timeStart).get('date');
		var month = moment(timeStart).get('month');
		var year = moment(timeStart).get('year').toString();

		if (rowData === "000001"){
			//console.log('yess!!!!');
		//this.getDate(timeStart);
			if(month === this.state.nowMonth && date === this.state.nowDate){
				var passToNext = "Today "+hour+":"+minute;
				console.log(passToNext);
				console.log(".................................");
				return (
					<View style = {styles.historyCell}>
						<TouchableOpacity style = {{height: 70, width: 375, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}} activeOpacity ={0.99}
							onPress={()=>Actions.detailHistory({title: passToNext})}>
							<Image style = {styles.avatar}
								source = {{uri:'http://36.media.tumblr.com/c1ab83d6816fb7302a230d5ce9580446/tumblr_inline_o3bwh2h8z81sitizh_540.jpg'}}/>
							<View style = {styles.textContent}>
								<View style = {{marginTop: 4, height: 30, alignItems: 'center', flexDirection: 'row'}}>
									<View style ={{height: 30, marginLeft: 0, width: 130, alignItems: 'flex-start', justifyContent: 'center'}}>
										<Text style= {styles.firstLine}>{"Today   "+hour+":"+minute}</Text>
									</View>
									<View style ={{height: 30, marginLeft: 9, width: 130, alignItems: 'flex-end', justifyContent: 'center'}}>
										<Text style= {styles.firstLine}>{"£"+charge}</Text>
									</View>
								</View>
								<View style = {{marginTop: -5, height: 30, alignItems: 'center', flexDirection: 'row'}}>
									<View style ={{height: 30, marginLeft: 0, width: 130, alignItems: 'flex-start', justifyContent: 'center'}}>
										<Text style= {styles.secondLine}>{(timeEnd-timeStart)/(1000*60) + "min"}</Text>
									</View>
									<View style ={{height: 30, marginLeft: 9, width: 130, alignItems: 'flex-end', justifyContent: 'center'}}>
										<Text style= {styles.secondLine}>{serviceType}</Text>
									</View>
								</View>								
							</View>
						</TouchableOpacity>
						<View style = {{marginTop: 0, marginLeft: 0, height: 1, width: 375, backgroundColor: '#646464'}}/>
					</View>
				    	);
			}else if (month === this.state.nowMonth && date + 1 === this.state.nowDate) {
				var passToNext = ("Yesterday "+hour+":"+minute).toString();
				console.log("passToNext");
				console.log(passToNext);
				console.log(".................................");
				return (
					<View style = {styles.historyCell}>
						<TouchableOpacity style = {{height: 70, width: 375, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}} activeOpacity ={0.99}
							onPress={()=>Actions.detailHistory({title: passToNext, clientData: receiptData, driver: driverData, index: row})}>
							<Image style = {styles.avatar}
								source = {{uri:'http://36.media.tumblr.com/c1ab83d6816fb7302a230d5ce9580446/tumblr_inline_o3bwh2h8z81sitizh_540.jpg'}}/>
							<View style = {styles.textContent}>
								<View style = {{marginTop: 4, height: 30, alignItems: 'center', flexDirection: 'row'}}>
									<View style ={{height: 30, marginLeft: 0, width: 130, alignItems: 'flex-start', justifyContent: 'center'}}>
										<Text style= {styles.firstLine}>{"Yesterday   "+hour+":"+minute}</Text>
									</View>
									<View style ={{height: 30, marginLeft: 9, width: 130, alignItems: 'flex-end', justifyContent: 'center'}}>
										<Text style= {styles.firstLine}>{"£"+charge}</Text>
									</View>
								</View>
								<View style = {{marginTop: -5, height: 30, alignItems: 'center', flexDirection: 'row'}}>
									<View style ={{height: 30, marginLeft: 0, width: 130, alignItems: 'flex-start', justifyContent: 'center'}}>
										<Text style= {styles.secondLine}>{(timeEnd-timeStart)/(1000*60) + "min"}</Text>
									</View>
									<View style ={{height: 30, marginLeft: 9, width: 130, alignItems: 'flex-end', justifyContent: 'center'}}>
										<Text style= {styles.secondLine}>{serviceType}</Text>
									</View>
								</View>								
							</View>
						</TouchableOpacity>
						<View style = {{marginTop: 0, marginLeft: 0, height: 1, width: 375, backgroundColor: '#646464'}}/>
					</View>
				    	);
			}else{
				var passToNext = (date+"/"+(month+1)+"/"+year+"   "+hour+":"+minute).toString();
				return (
					<View style = {styles.historyCell}>
						<TouchableOpacity style = {{height: 70, width: 375, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}} activeOpacity ={0.99}
							onPress={()=>Actions.detailHistory({title: passToNext, clientData: receiptData, driver: driverData, index: row})}>
							<Image style = {styles.avatar}
								source = {{uri:'http://36.media.tumblr.com/c1ab83d6816fb7302a230d5ce9580446/tumblr_inline_o3bwh2h8z81sitizh_540.jpg'}}/>
							<View style = {styles.textContent}>
								<View style = {{marginTop: 4, height: 30, alignItems: 'center', flexDirection: 'row'}}>
									<View style ={{height: 30, marginLeft: 0, width: 130, alignItems: 'flex-start', justifyContent: 'center'}}>
										<Text style= {styles.firstLine}>{date+"/"+(month+1)+"/"+year+"   "+hour+":"+minute}</Text>
									</View>
									<View style ={{height: 30, marginLeft: 9, width: 130, alignItems: 'flex-end', justifyContent: 'center'}}>
										<Text style= {styles.firstLine}>{"£"+charge}</Text>
									</View>
								</View>
								<View style = {{marginTop: -5, height: 30, alignItems: 'center', flexDirection: 'row'}}>
									<View style ={{height: 30, marginLeft: 0, width: 130, alignItems: 'flex-start', justifyContent: 'center'}}>
										<Text style= {styles.secondLine}>{(timeEnd-timeStart)/(1000*60) + "min"}</Text>
									</View>
									<View style ={{height: 30, marginLeft: 9, width: 130, alignItems: 'flex-end', justifyContent: 'center'}}>
										<Text style= {styles.secondLine}>{serviceType}</Text>
									</View>
								</View>								
							</View>
						</TouchableOpacity>
						<View style = {{marginTop: 0, marginLeft: 0, height: 1, width: 375, backgroundColor: '#646464'}}/>
					</View>
				    	);
			};
		}else{
			return(<View style ={{backgroundColor: 'transparent'}}/>);
		}
		/*
		}else{
			return(<View style ={{backgroundColor: 'transparent'}}/>);
		}*/
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
				<Text style = {styles.topBarText}>Service History</Text>
			</View>
			<View style = {styles.listviewContainer}>
				<ListView style = {styles.cellsContainer}
			        dataSource={this.state.dataSource}
          			renderRow={this._renderRow}/>
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

	listviewContainer:{
		//position: 'absolute',
		//top: 71,
		//left: 0,
		//right: 0,
		//bottom: 0,
		marginLeft: 0,
		marginTop: 0,
		width: 375,
		height: 800,
		//backgroundColor: 'gray'
	},

	cellsContainer:{
		marginLeft: 0,
		marginTop: 0,
		width: 375,	
	},	

	historyCell:{

		//position:'absolute',
		//top: 0,
		//left: 0,
		//right: 0,
		height: 71,
		backgroundColor: '#949494', 
		//opacity: 0.6
	},
	avatar: {
		marginLeft: 19,
		height: 56,
		width: 56,
		borderRadius: 56/2,
		resizeMode: 'cover'
	},

	textContent:{
		marginLeft: 14,
		height: 60,
		width: 269,
		flexDirection: 'column',
		//backgroundColor: '#999999'
	},

	firstLine:{
		fontFamily: 'SanFranciscoDisplay-Medium',
		fontSize: 16,
		color: '#646464',
		marginLeft: 0,
		},

	secondLine:{
		fontFamily: 'SanFranciscoDisplay-Regular',
		fontSize: 16,
		color: '#949494'
	}

});

module.exports = HistoryPage;