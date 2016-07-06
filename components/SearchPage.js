'use strict';
import {Actions} from 'react-native-router-flux';

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Navigator, ListView, TextInput} from 'react-native';

var seacrhListImage = {
	currentLocation: require('../ios/locationGuess.png'),
	historyIcon: require('../ios/searchHistory.png'),

};

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class SearchPage extends Component{
	constructor(props){
		super(props);
		this.state= {
			dataSource: ds.cloneWithRows(['Aldgate Tower','Russel Square','Oxford Circle','Soho London']),
		};
	};

	_renderRow =  (rowData: string, sectionID: number, rowID: number) => {

			return (
		        <TouchableOpacity
		        	activeOpacity = {0.9}>
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

	render(){
		return(
		<View style = {styles.container}>
			<View style = {styles.topBarContainer}>
				<TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
					onPress = {Actions.pop}>
					<Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
						source = {require('../ios/goBack.png')}/>
				</TouchableOpacity>
				<Text style = {styles.topBarText}>Pickup Location</Text>
			</View>
			<View style = {styles.searchBox}>
				<View style = {styles.searchInputPadding}>
					<View style = {{marginLeft: 13, height: 10, width: 10, borderRadius: 5, backgroundColor: '#FCC31B'}}/>
					<TextInput style = {styles.searchTextInput}
						placeholder = 'Address or place name'
						/>
				</View>
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
			<ListView style = {styles.searchResult}
			        dataSource={this.state.dataSource}
          			renderRow={this._renderRow}/>
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
		backgroundColor: 'white',
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
		marginTop: 0,
		marginLeft: 0,
		width: 375,
		backgroundColor: 'white',
	},

	thumb: {
		marginLeft: 19,
		marginTop: 10,
		marginBottom: 10,
	  width: 21,
	  height: 21,
	},

	row: {
	  flexDirection: 'row',
	  justifyContent: 'center',
	  alignItems: 'center',
	  //padding: 10,
	  backgroundColor: 'white',
	},


});