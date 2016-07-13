'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, TextInput, Text, View, TouchableOpacity, Platform, Image, Navigator, ListView, TouchableHighlight, ScrollView, CameraRoll, Dimensions} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';

export default class CameraRollPage extends Component{
	static propTypes = {

    };

    constructor(props){
    	super(props);
    	this.state = {
            num: 0,
        };
  	}


    getSelectedImages(images) {
        var num = images.length;
        // console.log(images);
        this.setState({
          num: num,
        });
        //Actions.crop();
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
    				<Text style = {styles.topBarText}>CameraRoll</Text>
    			</View>
                <CameraRollPicker
                  groupTypes='SavedPhotos'
                  batchSize={25}
                  maximum={15}
                  assetType='Photos'
                  imagesPerRow={3}
                  imageMargin={5}
                  callback={this.getSelectedImages.bind(this)} />
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
        shadowOpacity: 0.2,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0.5}
    },

    topBarText:{
        marginTop: 10,
        marginLeft: 100,
        color: 'white',
        fontSize: 20,
        fontFamily: 'SanFranciscoDisplay-Medium',
        backgroundColor: 'transparent',
    },
});