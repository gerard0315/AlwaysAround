'use strict';
import {Actions, ActionConst} from 'react-native-router-flux';

import React, {Component, propTypes} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Navigator, ListView, TextInput, Animated, Easing, ScrollView} from 'react-native';

var seacrhListImage = {
	currentLocation: require('../ios/locationGuess.png'),
	historyIcon: require('../ios/searchHistory.png'),

};

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var preset = ['Aldgate Tower','Russel Square','Oxford Circle','Soho London'];
var test = [];
var auto = [];
var placeIDs = [];
//var _results = ['test'];

export default class SearchPage extends Component{
	static defaultProps = {
      query: {
        key: 'AIzaSyBOsVygPS8F4LxR87UUMEMZ-PRx-7Erx7g',
        language: 'en',
        types: 'geocode',
      },
    };

    static propTypes = {
        lng: React.PropTypes.number.isRequired,
        lat: React.PropTypes.number.isRequired,
    }; 


	constructor(props){
		super(props);
		this.state= {
			dataSource: ds.cloneWithRows(preset),
			dataSourceNearby: ds.cloneWithRows(test),
			dataSourceAuto: ds.cloneWithRows(auto),
			isAutoGen: false,
			searchText: '',
			results: [],
			sliderPosition: new Animated.Value(35),
			viewPosition: new Animated.Value(0),
			recentTextColor: '#FFC927',
			nearbyTextColor: '#B6B6B6',
			nearbyListPosition: new Animated.Value(375),
			recentListPosition: new Animated.Value(0),
			searchResultsPosition: new Animated.Value(700),
			latlng: {
				lat: 0,
				lng: 0,
			}
		};
	}
	/*
	componentWillMount(){
		//console.log(this.state.lng);
		this.setState({dataSource: ds.cloneWithRows(preset)});
	}*/

	componentWillMount(){
		var result = [];
		var _request = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.props.lat + "," + this.props.lng + "&key=AIzaSyBOsVygPS8F4LxR87UUMEMZ-PRx-7Erx7g";
		//console.log(_request);
		fetch(_request, {method: "GET"})
			.then((response) => response.json())
			.then((responseData) => {
				for (var i = 0; i < 5; i ++){
					var address = responseData.results[i].formatted_address;
					var _add = address.split(", ");
					test.push(_add[0]);
				};
				this.setState({dataSourceNearby: ds.cloneWithRows(test)});
			})
			.done();

	}

	componentDidMount(){
		this.setState({dataSourceNearby: ds.cloneWithRows(test)});	
	}

	_renderRowRecent = (rowData: string, sectionID: number, rowID: number) => {

			return (
		        <TouchableOpacity
		        	activeOpacity = {0.9}
		        	onPressIn = {this.onPressAddress.bind(this)}>
		          <View>
		            <View style={styles.row}>
		              <Image style={styles.thumb} source={seacrhListImage.historyIcon} />
		              <Text style={{marginLeft: 10, flex:1,fontSize:18,color:'#949494', fontFamily: 'SanFranciscoDisplay-Regular'}}>
		                {'    ' + rowData}
		              </Text>
		            </View>
		            <View style = {{marginTop: 0, marginLeft: 50, height: 1, width: 323, backgroundColor: '#949494'}}/>
		          </View>
		        </TouchableOpacity>
		    	);
	}

	_renderRowNearby = (rowData: string, sectionID: number, rowID: number) => {
			console.log(rowData);
			return (
		        <TouchableOpacity
		        	activeOpacity = {0.9}
		        	onPressIn = {this.onPressAddress.bind(this)}>
		          <View>
		            <View style={styles.row}>
		              <Image style={styles.thumb} source={seacrhListImage.currentLocation} />
		              <Text style={{marginLeft: 10, flex:1,fontSize:18,color:'#949494', fontFamily: 'SanFranciscoDisplay-Regular'}}>
		                {'    ' + rowData}
		              </Text>
		            </View>
		            <View style = {{marginTop: 0, marginLeft: 50, height: 1, width: 323, backgroundColor: '#949494'}}/>
		          </View>
		        </TouchableOpacity>
		    	);

	}

	_renderRowAuto = (rowData: string, sectionID: number, rowID: number) => {

			return (
		        <TouchableOpacity
		        	activeOpacity = {0.2}
		        	onPressIn = {this.onPressInAddress.bind(this, rowID)}
		        	onPressOut = {this.onPressOutAddress.bind(this, rowID)}
		        	//onPress = {this.passDataToMain.bind(this)}
		        	>
		          <View>
		            <View style={styles.row}>
		              <Image style={styles.thumb} source={seacrhListImage.currentLocation} />
		              <Text style={{marginLeft: 10, flex:1,fontSize:18,color:'#949494', fontFamily: 'SanFranciscoDisplay-Regular'}}>
		                {'    ' + rowData}
		              </Text>
		            </View>
		            <View style = {{marginTop: 0, marginLeft: 50, height: 1, width: 323, backgroundColor: '#949494'}}/>
		          </View>
		        </TouchableOpacity>
		    	);

	}

	passDataToMain(lat, lng){
	    Animated.timing(this.state.searchResultsPosition, {
	      toValue: 700, // 目标值
	      duration: 150,
	      delay: 1000,
	      easing: Easing.linear, // 动画时间
	    }).start();
		console.log(this.state.latlng.lat);
		console.log(this.state.latlng.lng);
	    Actions.pop({toLat: this.state.latlng.lat, toLng: this.state.latlng.lng});
	    console.log('done');
	}

	onPressAddress(){
		console.log('HIIIIII');
	}

	onPressInAddress(){
		console.log('presssssssssss');
	}

	onPressOutAddress(rowID){
		console.log('ouuuuuuuuut');
		var placeID = placeIDs[rowID];
		this.getLocation(placeID);
	}

	getLocation(placeID){
		var _request = "https://maps.googleapis.com/maps/api/geocode/json?place_id=" + placeID + "&key=AIzaSyBOsVygPS8F4LxR87UUMEMZ-PRx-7Erx7g";
		var _lat = 0;
		var _lng = 0;
		//console.log(_request);
		fetch(_request, {method: "GET"})
			.then((response) => response.json())
			.then((responseData) => {
				_lat = responseData.results[0].geometry.location.lat;
				_lng = responseData.results[0].geometry.location.lng;
				this.setState({
					latlng:{
						lat: _lat,
						lng: _lng,
					}
				});
			})
			.done((_lat, _lng)=>this.passDataToMain(_lat, _lng));		
	}

	onChangeSearch(event){
		//this.textInputFocus();
		auto = [];
		placeIDs = [];
		this.setState({searchText: event.nativeEvent.text});
		if(this.state.searchText === ''){
			console.log('null');
		}else{
			var _request = "https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=" + encodeURI(this.state.searchText) +"&key=AIzaSyBOsVygPS8F4LxR87UUMEMZ-PRx-7Erx7g";
			fetch(_request, {method: "GET"})
			      .then((response) => response.json())
			      .then((responseData) => {
			      	//console.log(responseData);
			      
			      	if (responseData.status === 'ZERO_RESULTS'){
			      		console.log('zerooooooooooo');
			      	}else{
				        for (var i = 0; i < 5; i ++){
				        	if (typeof responseData.predictions === 'undefined'){
				        		console.log('response error');
				        	}else{
								var address = responseData.predictions[i].terms[0].value;
								var id = responseData.predictions[i].place_id;
								auto.push(address);
								placeIDs.push(id);
							}
				        };
				        console.log(placeIDs);
				      	this.setState({dataSourceAuto: ds.cloneWithRows(auto)});
			      	};
					
			      }).catch((e) =>
			      	console.log(e)
			      )
			      .done();
		  }
		}

	onPressRecent(){
	    Animated.timing(this.state.sliderPosition, {
	      toValue: 35, // 目标值
	      duration: 100,
	      delay: 10,
	      easing: Easing.linear, // 动画时间
	    }).start();

	    Animated.timing(this.state.recentListPosition, {
	      toValue: 0, // 目标值
	      duration: 100,
	      delay: 10,
	      easing: Easing.linear, // 动画时间
	    }).start();

	    Animated.timing(this.state.nearbyListPosition, {
	      toValue: 375, // 目标值
	      duration: 100,
	      delay: 10,
	      easing: Easing.linear, // 动画时间
	    }).start();

	    this.setState({recentTextColor: '#FFC927'});
     	this.setState({nearbyTextColor: '#B6B6B6'});

	}

	onPressNearby(){
	    Animated.timing(this.state.sliderPosition, {
	      toValue: 220, // 目标值
	      duration: 100,
	      delay: 10,
	      easing: Easing.linear, // 动画时间
	    }).start();

	    Animated.timing(this.state.recentListPosition, {
	      toValue: 375, // 目标值
	      duration: 100,
	      delay: 10,
	      easing: Easing.linear, // 动画时间
	    }).start();

	    Animated.timing(this.state.nearbyListPosition, {
	      toValue: -375, // 目标值
	      duration: 100,
	      delay: 10,
	      easing: Easing.linear, // 动画时间
	    }).start();
      	
      	this.setState({nearbyTextColor: '#FFC927'});
      	this.setState({recentTextColor: '#B6B6B6'});

	}
	
	componentWillUnmount(){
		test = [];
		auto = [];
	}

	textInputFocus(){
		console.log('focus');
	    Animated.timing(this.state.searchResultsPosition, {
	      toValue: 129, // 目标值
	      duration: 150,
	      delay: 5,
	      easing: Easing.linear, // 动画时间
	    }).start();
	}

	
	textInputBlur(){
		if(this.state.searchText === ''){
		    Animated.timing(this.state.searchResultsPosition, {
		      toValue: 700, // 目标值
		      duration: 150,
		      delay: 100,
		      easing: Easing.linear, // 动画时间
		    }).start();
		}else{
			console.log('collpase keyboard');
		};
	}

	onBack(){
		Actions.home({
			//text:,
			type: ActionConst.BACK});
	}
	

	render(){
		return(
		<ScrollView style = {styles.container} scrollEnabled ={false}>
			<View style = {styles.topBarContainer}>
				<TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
					onPress = {this.onBack}>
					<Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
						source = {require('../ios/goBack.png')}/>
				</TouchableOpacity>
				<Text style = {styles.topBarText}>Pickup Location</Text>
			</View>
			<View style = {styles.searchBox}>
			<View style = {styles.searchInputPadding}>
				<View style = {{marginLeft: 13, height: 10, width: 10, borderRadius: 5, backgroundColor: '#FFC927'}}/>
				<TextInput style = {styles.searchTextInput}
					placeholder = 'Address or place name'
					onChange = {this.onChangeSearch.bind(this)}
					value = {this.state.searchText}
					onFocus = {this.textInputFocus.bind(this)}
					onBlur = {this.textInputBlur.bind(this)}
					/>
			</View>
			</View>
			<View style = {{marginTop: 0, marginLeft: 0, height: 1, width: 375, backgroundColor: '#949494'}}/>
			<View style = {styles.tabbar}>
				<View style = {styles.tabbarTitle}>
					<Text style = {[styles.tabbarLabel, {color: this.state.recentTextColor}]} onPress = {this.onPressRecent.bind(this)}>RECENT</Text>
					<Text style = {[styles.tabbarLabel, {color: this.state.nearbyTextColor}]} onPress = {this.onPressNearby.bind(this)}>NEARBY</Text>
				</View>
				<Animated.View style = {{height: 5, marginLeft: this.state.sliderPosition, width: 120, backgroundColor: '#FFC927'}}>
				</Animated.View>
			</View>
			<View style = {{marginTop: 0, marginLeft: 0, height: 1, width: 375, backgroundColor: '#949494'}}/>
			    <TouchableOpacity style = {{marginTop: 0, marginLeft: 0, height: 41, width: 375, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}}
				   	onPress = {Actions.pop}
				   	activeOpacity = {0.9}>
				   	<Image style={styles.thumb} source={seacrhListImage.currentLocation} />
				    <Text style={{marginLeft: 10, fontSize:18,color:'#949494', fontFamily: 'SanFranciscoDisplay-Regular'}}>
			            {'    Current Location'}
				    </Text>
				</TouchableOpacity>
				<View style = {{marginTop: 0, marginLeft: 50, height: 1, width: 323, backgroundColor: '#949494'}}/>
				<View style = {{flexDirection: 'row'}}>
					<Animated.View style = {[styles.recentList, {left: this.state.recentListPosition}]}>
						<ListView style = {{flex: 1}}
							    dataSource={this.state.dataSource}
				          		renderRow={this._renderRowRecent}/>
			        </Animated.View>
			        <Animated.View style = {[styles.nearbyList, {left: this.state.nearbyListPosition}]}>
						<ListView style = {{flex: 1}}
							    dataSource={this.state.dataSourceNearby}
				          		renderRow={this._renderRowNearby}
				          		enableEmptySections = {true}/>
			        </Animated.View>
		        </View>
		        <Animated.View style = {[styles.searchResultsList, {top: this.state.searchResultsPosition}]}>
						<ListView style = {{flex: 1}}
							    dataSource={this.state.dataSourceAuto}
				          		renderRow={this._renderRowAuto}
				          		enableEmptySections = {true}/>
		        </Animated.View>
          	<Image style = {styles.google}
          		source = {require('../ios/powered_by_google_on_white.png')}/>
		</ScrollView>
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
		//opacity: 0.9,
		//justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	    shadowRadius: 0.6,
	    shadowOpacity: 0.2,
	    shadowColor: 'black',
	    shadowOffset: {width: 0, height: 0.5},
	},

	topBarText:{
        marginTop: 10,
        marginLeft: 92,
        color: 'white',
        fontSize: 20,
        fontFamily: 'SanFranciscoDisplay-Medium',
        backgroundColor: 'transparent',
	},

	searchBox:{
		marginTop: 0,
		marginLeft: 0,
		height: 56,
		width: 375,
		backgroundColor: 'transparent',
	},

	searchInputPadding:{
		marginTop: 10,
		marginLeft: 19,
		height: 36,
		width: 337,
		backgroundColor: 'white',
		borderRadius: 2,
		borderWidth: 1,
		borderColor: '#727272',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	searchTextInput:{
		marginLeft: 10,
		width: 311,
		fontSize: 18,
		fontFamily: 'SanFranciscoDisplay-Regular',
		color: '#727272'
	},

	searchResult:{
		//marginTop: 0,
		//marginLeft: 0,
		width: 375,
		backgroundColor: 'green',
	},

	thumb: {
		marginLeft: 19,
		marginTop: 4,
		//marginBottom: 8,
	  	width: 18,
	  	height: 21,
	  	resizeMode: 'stretch'
	},

	row: {
	  flexDirection: 'row',
	  justifyContent: 'center',
	  alignItems: 'center',
	  //padding: 10,
	  backgroundColor: 'white',
	  height: 41
	},

	google:{
		position: 'absolute',
		alignSelf: 'center',
		bottom: 60,
		left: 130,
		height: 15,
		width: 118,
		resizeMode: 'stretch'
	},

	tabbar:{
		marginTop: 0,
		marginLeft:0,
		width: 375,
		height: 40,
		backgroundColor: 'white',
		flexDirection: 'column'
	},

	tabbarTitle:{
		marginTop: 0,
		flexDirection: 'row',
		//backgroundColor: 'red',
		height: 35,
		justifyContent: 'space-around',
		alignItems: 'center'
	},

	tabbarLabel:{
		fontSize: 18,
		fontFamily: 'SanFranciscoDisplay-Medium',
		//color: '#FFC927',
		textAlign: 'center'
	},

	recentList:{

		top: 0,
		//left: 0,
		height: 500,
		width: 375,
		//backgroundColor: 'green'
	},

	nearbyList:{
		top: 0,
		//left: 375,
		height: 500,
		width: 375,
		//backgroundColor: 'green'		
	},

	searchResultsList:{
		position: 'absolute',
		left: 0,
		//width: 0,
		width: 375,
		height: 500,
		backgroundColor: 'white',
	    shadowRadius: 0.6,
	    shadowOpacity: 0.3,
	    shadowColor: 'black',
	    shadowOffset: {width: 0, height: -0.5},

	}

});