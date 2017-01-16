'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions, ActionConst} from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Dimensions from 'Dimensions';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS, AlertIOS} from 'react-native';
import EditBasics from './EditBasicsPage.js';
import EditBehaviours from './EditBehavePge.js';
import EditHealth from './EditHealthPage';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

export default class EditDog extends Component{
    static propTypes = {
        data: React.PropTypes.object.isRequired,
        title: React.PropTypes.string.isRequired,
        initialPage: React.PropTypes.number.isRequired,
        token: React.PropTypes.string.isRequired,
        operation: React.PropTypes.string,
        avatar: "",
    }; 

    constructor(props){
    	super(props);
    	this.state = {
    		nextPage: this.props.initialPage,
        basic: null,
        health: null,
        behave: null,
    	};
  	}

    onPressBack(event){
      Actions.pop();
      //Actions.myDogs({type: ActionConst.BACK});
    }

    componentDidMount(){
      //Actions.refresh();
      console.log(this.props.operation);
      console.log(this.props.data._id);
    }

    onNextPressedBasic(nextPage, basicData){
      console.log(basicData);
      this.setState({basic: basicData});
      this.setState({nextPage: nextPage});
      //console.log(basicData);
    }

    onNextPressedBehave(nextPage, behaveData){
      this.setState({behave: behaveData})
      this.setState({nextPage: nextPage});
      //console.log(behaveData);
    }

    onPressSave(healthData){
      var newDog = {
        basic: this.state.basic,
        behaviours: this.state.behave,
        health: healthData
      }
      this.uploadData(newDog);
    }

    componentWillUnmount(){
      console.log("unmounting");
    }

    uploadData(newDog){
      newDog.basic.avatar = this.state.avatar;
      console.log(JSON.stringify(newDog));
      //Actions.home({type: ActionConst.RESET});
      
      if(this.props.operation === 'update'){
        console.log(this.props.data._id);
        fetch("http://alwaysaround.me:8081/api/my/pet/" + this.props.data._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.props.token
          },
          mode: 'cors',
          body: JSON.stringify(newDog)
        }).then((response) => response.json())
        .then((res)=>{
          console.log("this is response:" + JSON.stringify(res));
          //Actions.myDogs();
          //Actions.pop({popNum: 2});
          
          if (res.status.code === 2114){
            //Actions.myDogs({data: this.props.data});
            Actions.pop({popNum: 2});
          }else{
              AlertIOS.alert("ERROR!!" + res.status.msg);          
          }
          
        })

      }else if(this.props.operation === 'create'){
        console.log(JSON.stringify(newDog));
        fetch("http://alwaysaround.me:8081/api/my/pet/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.props.token
          },
          body: JSON.stringify(newDog)
        }).then((response) => response.json())
        .then((res)=>{
          console.log(res);
          if (res.status.code === 2110){
            Actions.pop();
          }else{
              AlertIOS.alert("ERROR!!" + res.status.msg);          
          }
        })
      }
      

    }

    testUpload(uri){
      console.log("pic uri is " + uri);
      let data = new FormData()
      if (uri) {
        data.append('pet', {uri: uri, name: 'image.jpg', type: 'image/jpg'});
      }
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
          "x-access-token": this.props.token
        },
        body: data,
      }

      fetch("http://alwaysaround.me:8081/api/pet/avatar-upload/", config).then((response) => response.json())
        .then((res)=>{
          console.log(res);
          if (res.status.code === 2122){
            this.setState({avatar: res.data.url});
          }else{
              AlertIOS.alert("ERROR!!" + res.status.msg);          
          }
        }).done()

  }

	render(){
		return(
    	<View style = {styles.container}>
	      <View style = {styles.topBarContainer}>
	        <TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
	          onPress = {this.onPressBack.bind(this)}>
	          <Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
	            source = {require('../ios/goBack.png')}/>
	        </TouchableOpacity>
	        <Text style = {styles.topBarText}>{this.props.title}</Text>
	      </View>
	      	<View style = {styles.tabBarPadding}/>
			<ScrollableTabView
			   	tabBarPosition = 'overlayTop'
			 	  tabBarUnderlineColor = '#FCC31B'
			   	tabBarBackgroundColor = '#EA4D4E'
		     	tabBarActiveTextColor = '#FCC31B'
		      tabBarInactiveTextColor = 'white'
		      initialPage = {this.props.initialPage}
          page = {this.state.nextPage}
		      tabBarTextStyle = {styles.tabBarText}>
		      	
     		    <EditBasics data ={this.props.data.basic} onNext = {this.onNextPressedBasic.bind(this)} onChosenPic = {this.testUpload.bind(this)} tabLabel='Basics'/>
     		    <EditBehaviours data ={this.props.data.behaviours} onNext = {this.onNextPressedBehave.bind(this)} tabLabel = 'Behaviours'/>
     		    <EditHealth data ={this.props.data.health} onSubmit = {this.onPressSave.bind(this)} tabLabel = 'Health'/>
				
			</ScrollableTabView>
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
    backgroundColor: 'transparent',
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
    shadowOffset: {width: 0, height: 0.5}
  },

  topBarText:{
    marginTop: 10,
    marginLeft: 117,
    color: 'white',
    fontSize: 20,
    fontFamily: 'SanFranciscoDisplay-Medium',
    backgroundColor: 'transparent',
  },

  tabBarText:{
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Regular',
    flexWrap: 'wrap',
  },

  tabBarPadding:{
  	position: 'absolute',
    left: 0,
    top: 74,
    right: 0,
    height: 23,
 	backgroundColor: '#EA4D4E',
  }

});