'use strict';

import React, {Component, PropTypes} from 'react';
import {Actions, ActionConst} from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import moment from 'moment';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

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
  Modal,
  ActivityIndicator,
  RefreshControl
} from 'react-native';


var temp = [
  {
    "_id": "0",
    'basic' :{
      'description': "",
      'avatar': '',
      'name': "",
      'gender': "male",
      'breed': "",
      'yob': null,
      'size': "",
      'vac_uptodate': false,
      'spayed': false,
      'friendly_to_dogs': false
    },

    'behaviours':{
      'commands': "",
      'friendly_to_child': false,
      'digs': false,
      'jumps_on_people': false,
      'is_chipped': false,
      "pulls": false,
      "is_in_season": false,
      "has_id_tag": false
    },

    'health':{
      'medication': "",
      'allergies': "",
      'veterinary':{
        'name': "",
        'addr': "",
        'phone': ""
      },

      'insurance':{
        'name': "",
        'number': ""
      },
    },
  }
];

var Dogs = [];
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
/*
var swipeoutBtns = [
  {
    text: 'Delete',
    backgroundColor: '#EA4D4E',
    onPress: onPressDelete();
  }
]

var onPressDelete = function(){
  console.log("delete");
}
*/

export default class MyDogs extends Component{
  static PropTypes = {
    data: React.PropTypes.object.isRequired,
  };

  constructor(props){
    super(props);
    var now = Date.now();
    var _now_year = moment(now).get('year');
    var data = parseInt(_now_year);
    this.state = {
        dataSource: ds.cloneWithRows(temp),
        nowYear: data,
        token: this.props.data.token,
        dataFetched: false,
        dataOnback: this.props.data,
        refreshing: false,
    };
  }

  componentDidMount(){
    //Actions.refresh();
    console.log("DID MOUNT " + this.props.data.token);
    this.getDogData(this.props.data.token);
    //this._onRefresh();
    /*
    try{
    storage.load({
        key: 'dogslist',
      }).then(ret => {
          if(ret.dogs.length != 0){
            console.log("loading from ram")
            this.loadDogData(ret.dogs);
          }else{
            console.log("fetching data");
            this.getDogData(this.state.token);
          }
      }).done();
    }catch(error){
      console.log("ERROR IS: " + error);
      this.getDogData(this.state.token);
    }
    */
  }

  loadDogData(doglist){
    console.log("loading from ram");
    Dogs = doglist;
    //console.log(doglist);
    //console.log(Dogs);
    this.setState({dataSource: ds.cloneWithRows(Dogs)});
    this.setState({dataFetched: true});
  }

  getDogData(token){
      console.log("fetching data")
      Dogs = [];
      fetch("http://alwaysaround.me:8081/api/my/pet/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
      }).then(res =>{
        console.log("responing");
        return res.json()
      }).then(response=>{
        console.log(response)
        return response.data
      }).then(parsedData =>{
        for (var i = 0; i < parsedData.length; i++){
          Dogs.push(parsedData[i]);
        }
        /*
        try {
            storage.save({
                key: 'dogslist',  
                rawData: { 
                  dogs: Dogs
                },
                expires: null
              });
        } catch (error) {
              AlertIOS.alert(
                "error saving data"
                );
        }
        */
        this.setState({dataSource: ds.cloneWithRows(Dogs)});
        this.setState({dataFetched: true});
        this.setState({refreshing: false});
      }).done();
  }

  onPressAddDog(){
    Actions.editDog({title: 'Add Dog'});
  }

  onPressDog(rowData){
    console.log('to dogDetails');

    //console.log("rowDta is: " + rowData.basic.name);
    Actions.dogDetails({Data: rowData, token: this.props.data.token});
  }

  onBack(){
    //console.log("ON PRESS BACK, Data is" + this.state.dataOnback.token) ;
    //console.log(this.props.data);
    Actions.home({type: ActionConst.RESET, data:this.state.dataOnback});
  }

  onPressOpen(){
    console.log("press in");
  }

  onPressIn(){
    console.log("on press out");
  }

  componentWillUnmount(){
    this.setState({
        dataSource: ds.cloneWithRows(temp),
        nowYear: 0,
        token: null,
        dataFetched: false,
        refreshing: false,
    }),
    Dogs = [];
  }

  _onRefresh() {
    //console.log("refreshing");
    this.setState({refreshing: true});
    this.getDogData(this.props.data.token);
  }


  _renderRow = (rowData: string, sectionID: number, rowID: number, _rowData: string) => {
    //console.log(rowData)
    //console.log(this.state.nowYear);
    var name = rowData.basic.name;
    var gender = rowData.basic.gender;
    var yob = rowData.basic.yob;
    var breed = rowData.basic.breed;
    var old = this.state.nowYear - yob; 
    var token = this.props.data.token;
    var picUri =  rowData.basic.avatar;
    var swipeoutBtns = [
        {
          text: 'Delete',
          backgroundColor: '#EA4D4E',
          onPress: function(){
                      var url = "http://alwaysaround.me:8081/api/my/pet/" + rowData._id;
                      fetch(url, {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              "x-access-token": token,
                            }
                        }).then((response) => response.json())
                          .then((res) =>{
                              console.log(res);
                              this._onRefresh();
                          }).done();
            }.bind(this)
          }
        ]

    return(
      <View style = {styles.cellsContainer}>
      <Swipeout right={swipeoutBtns}
        disabled = {false}
        sensitivity = {10}
        backgroundColor = {'white'}
        //onOpen={(sectionID, rowID) => this._handleSwipeout(sectionID, rowID) }
        //onOpen = {this.onPressOpen.bind(this)}
        >
        <TouchableOpacity style = {{height: 70, marginLeft: 19, marginTop: 0, flexDirection: 'row', alignItems: 'center'}} 
          activeOpacity = {0.9}
          onPress = {this.onPressDog.bind(this, rowData)}
          //onPressOut = {this.onPressOut.bind(this)}
          onPressIn = {this.onPressIn.bind(this)}
          >
          <Image style = {{marginLeft: 0, height: 54, width: 54, borderRadius:27, resizeMode: 'stretch'}}
            source = {{uri: picUri}}/>
          <View style ={{marginLeft: 14, marginTop: 11, width: 249, height: 42, backgroundColor: 'white', flexDirection: 'column'}}>
            <View style = {{marginLeft: 0, marginTop: -5, width: 249, height: 21, backgroundColor: 'transparent', flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style = {[styles.topText]}>{name}</Text>
              <Text style = {[styles.topText]}>{gender}</Text>
            </View>
            <View style ={{marginLeft: 0, marginTop: 0, width: 249, height: 2, backgroundColor: 'white'}}/>
            <View style = {{marginLeft: 0, marginTop: 0, width: 249, height: 21, backgroundColor: 'transparent', flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style = {[styles.bottomText]}>{breed}</Text>
              <Text style = {[styles.bottomText]}>{old + ' years old'}</Text>              
            </View>
          </View>
          <Image style = {{marginLeft: 14, marginTop: 0, width: 6, height: 20, resizeMode: 'stretch'}}
            source = {require('../ios/enter_details.png')}/>
        </TouchableOpacity>
      </Swipeout>
      <View style = {{height: 1, marginTop: 0, marginLeft: 19, width: 337, backgroundColor: '#B6B6B6'}}/>
      </View>
      )
  }

  renderListView(){
    if(this.state.dataFetched){
      return(
        <ListView style = {styles.cellsContainer}
                  //scrollEnabled = {false}
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow}
                  refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }/>
        )
    }else{
      return(
        <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
      />   
      )
    }
  }


  render(){
    return(
    <View style = {styles.container}>
      <View style = {styles.topBarContainer}>
        <TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
          onPress = {this.onBack.bind(this)}>
          <Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
            source = {require('../ios/goBack.png')}/>
        </TouchableOpacity>
        <Text style = {styles.topBarText}>My Dogs</Text>
      </View>
      <View style = {styles.listviewContainer}>

        { this.renderListView()}

      </View>
      <TouchableOpacity style = {styles.buttonAdd}
        activeOpacity = {0.9}
        onPress = {()=>Actions.editDogs({title: 'Add Dog', initialPage: 0, data: temp[0], token: this.state.token, operation: "create"})}>
          <Image style= {{height: 46, width: 337, marginLeft: 0, marginTop: 0, resizeMode: 'stretch'}}
            source = {require('../ios/add_dog.png')}/>
      </TouchableOpacity>
      <View style = {styles.textSwipe}>
      <Image 
            source = {require('../ios/swipe_delete.png')}/>
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
    shadowRadius: 0.6,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5}
  },

  topBarText:{
    marginTop: 10,
    marginLeft: 120,
    color: 'white',
    fontSize: 20,
    fontFamily: 'SanFranciscoDisplay-Medium',
    backgroundColor: 'transparent',
  },

  listviewContainer:{
    marginLeft: 0,
    marginTop: 1,
    width: 375,
    height: 800,
  },

  cellContainer:{
    marginTop: 0,
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

  topText:{
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Medium',
    color: '#727272'
  },

  bottomText:{
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Regular',
    color: '#B6B6B6'
  },

  buttonAdd:{
    position: 'absolute',
    left: 19,
    right: 19,
    top: 667- 78,
    height: 46
  },
  
  textSwipe:{
    position: 'absolute',
    top: 667- 78 + 46 + 10,
    height: 12,
    width: 375,
    alignItems: 'center',
    justifyContent: 'center'
  },



});