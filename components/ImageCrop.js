'use strict';
import React, {Component, NativeModules} from 'react';
import {Actions} from 'react-native-router-flux';
import {
	//ReactNative,
	//ReactNativeImageCropping,
	//NativeModules,
  	Dimensions,
  	StyleSheet,
  	Text,
  	TouchableOpacity,
  	View,
  	CameraRoll,
  	Image,
  	ScrollView
} from 'react-native';
//import ImagePicker from 'react-native-image-crop-picker';
//const RCTImageEditingManager = require('NativeModules').ImageEditingManager;
//const React = require('react-native');
const ReactNativeImageCropping = require('NativeModules').ReactNativeImageCropping;

export default class ImageCropping extends Component{
	static propTypes = {


    };

    constructor(props){
    	super(props);
    	this.state = {
    		photoSource: null,
			source: null,
			ImgCropData:{
			  offset: {
			    x: 0,
			    y: 74,
			  },
			  size: {
			    width: 3024,
			    height: 4032,
			  },
			  displaySize:{
			    width: 375,
			    height: 667,
			  },
			},
        };
  	}


	componentDidMount() {
	    const fetchParams = {
	      first: 1,
	    };

		this.timer = setTimeout(
      		() => {		
	      		CameraRoll.getPhotos(fetchParams)
			      .then((data) => {
			          // console.log(data);
			          this.setState({
			            photoSource: {uri: data.edges[0].node.image.uri }

			          });
			          this.setState({
			          	source: data.edges[0].node.image.uri
			          });
			      })
			      .catch((error) => console.log('getPhotos error: ' + error.message))
			      .done(() => {
			        console.log(this.state.source);
			        console.log('done');
			      });
		  },
      	100
    	);


	}

	componentWillUnmount(){
		this.setState({photoSource: null});
		this.timer && clearTimeout(this.timer);
	}

	onPressSave(){

		ReactNativeImageCropping
		    .cropImageWithUrlAndAspect(this.state.source, ReactNativeImageCropping.AspectRatioSquare)
		    .then(image => {
		        //Image is saved in NSTemporaryDirectory!
		        //image = {uri, width, height}  
		    },
		    err => console.log(b));
      	Actions.editAccount();
      	
	}

	onSuccess(){
		console.log('doneeeeeeeeeeeeeeeeeeeeeee');
	}

	render(){
		return(
	      <View style={styles.container}>
	      	<Text style = {styles.title}>PHOTO</Text>
	        <View style={styles.imageGrid}>
	          <Image style = {styles.image}
	          	source = {this.state.photoSource}/>
	        </View>
	        <View style = {styles.buttonContainer}>
	        	<Text style = {styles.text} onPress = {Actions.pop}>RETAKE</Text>
	        	<Text style = {styles.text} onPress = {this.onPressSave.bind(this)}>SAVE</Text>
	        </View>
	      </View>
		);
	}
}

var styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	backgroundColor: '#1C1C1C',
    	flexDirection: 'column'
  	},

  	imageGrid: {
    	//flex: 1,
    	marginTop: 100,
    	flexDirection: 'row',
    	flexWrap: 'wrap',
    	justifyContent: 'center',
    	//alignItems: 'center'
  	},
  	image: {
    	width: 337,
    	height: 337,
    	//margin: 10,
  	},

	text:{
	    fontSize: 18,
	    color: 'white',
	    fontFamily: 'SanFranciscoDisplay-Regular'
	},

	title:{
		marginTop: 30,
		fontSize: 20,
	    color: 'white',
	    fontFamily: 'SanFranciscoDisplay-Medium',
	    textAlign: 'center'
	},

	buttonContainer:{
		marginTop: 115,
		marginLeft: 19,
		width: 337,
		flexDirection: 'row',
		height: 24,
		justifyContent: 'space-between'
	}
  });