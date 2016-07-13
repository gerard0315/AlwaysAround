'use strict';
import React, { Component,ReactNativeImageCropping } from 'react';
import {Actions} from 'react-native-router-flux';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

//const {ReactNativeImageCropping} = React.NativeModules;

export default class ImageCropping extends Component{
	render(){
		return(
			<ReactNativeImageCropping/>
		)
	}
}