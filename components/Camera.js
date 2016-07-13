'use strict';
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Camera from 'react-native-camera';

export default class CameraView extends Component{
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.topBar}>
          <Text style = {styles.cancelText} onPress = {Actions.pop}>Cancel</Text>
          <Text style = {styles.topBarText}>PHOTO</Text>
        </View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <View style = {styles.shotPadding}>
          <View style = {styles.buttonPadding}>
            <TouchableOpacity style = {styles.shotButton} activeOpacity = {0.7} onPress = {this.takePicture.bind(this)}/>
          </View>
        </View>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
    Actions.crop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 667-74-218,
    width: Dimensions.get('window').width,
    marginTop: 0
  },

  topBar:{
    marginTop:0,
    width: Dimensions.get('window').width,
    height: 74,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    flexDirection: 'row'
    //alignItems: 'center'
  },

  cancelText:{
    marginTop: 15,
    marginLeft: 19,
    fontSize: 18,
    color: 'white',
    fontFamily: 'SanFranciscoDisplay-Regular'
  },

  shotPadding:{
    marginTop: 0,
    width: Dimensions.get('window').width,
    height: 218,
    marginLeft:0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C'
  },

  buttonPadding:{
    height: 110,
    width: 110,
    borderRadius: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  shotButton:{
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: 'white',
    borderColor: '#1C1C1C',
    borderWidth: 5,
  },

  topBarText:{
    marginTop: 10,
    marginLeft: 87,
    color: 'white',
    fontSize: 20,
    fontFamily: 'SanFranciscoDisplay-Medium',
    backgroundColor: 'transparent',
  },
});