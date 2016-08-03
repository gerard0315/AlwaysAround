'use strict';

import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import moment from 'moment';

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
} from 'react-native';

var Dogs = [
  {
    'Basics' :{
      'Pic': '',
      'Name': 'Peking',
      'Gender': 'Male',
      'Breed': 'Cardigan Welsh Corgi',
      'YoB': 2015,
      'Size': 'Medium, 21-40 lb',
      'Vacination': true,
      'Spayed': true,
      'Friendly': true,
      'Intro': null,
    },

    'Behaviours':{
      'Commands': 'Peking!',
      'InSeason': true,
      'Child_friendly': true,
      'Pulls': true,
      'Barks': true,
      'Digs': true,
      'Jumps': true,
      'Chipped': true,
      'IDtag': true,
    },

    'Health':{
      'OnMeds': 'None',
      'Allergies': 'None',
      'Veterinary':{
        'Name': 'Godard Veterinary Group, Mile End',
        'Address': '47 Burdett Road, Bow, London, E3 4TN',
        'Phone': '020 8981 5535',
      },

      'Insurance':{
        'Name': 'PetPlan',
        'Number': 'NH 472469216'
      },
    },
  }
];

var emptyObj = [
  {
    'Basics' :{
      'Pic': '',
      'Name': null,
      'Gender': null,
      'Breed': null,
      'YoB': null,
      'Size': null,
      'Vacination': false,
      'Spayed': false,
      'Friendly': false,
    },

    'Behaviours':{
      'Commands': null,
      'Child_friendly': false,
      'Digs': false,
      'Jumps': false,
      'Chipped': false,
    },

    'Health':{
      'OnMeds': null,
      'Allergies': null,
      'Veterinary':{
        'Name': null,
        'Address': null,
        'Phone': null,
      },

      'Insurance':{
        'Name': null,
        'Number': null,
      },
    },
  }
];
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
var swipeoutBtns = [
  {
    text: 'Delete',
    backgroundColor: '#EA4D4E',
  }
]

export default class MyDogs extends Component{
  constructor(props){
    super(props);
    var now = Date.now();
    var _now_year = moment(now).get('year');
    var data = parseInt(_now_year);
    this.state = {
        dataSource: ds.cloneWithRows([Dogs[0]]),
        nowYear: data,
    };
  }

  componentWillMount(){
   // this.setState({nowYear: data});
    console.log(this.state.nowYear);
  }

  onPressAddDog(){
    Actions.editDog({title: 'Add Dog'});
  }

  onPressDog(rowData){
    console.log('to dogDetails');
    Actions.dogDetails({Data: rowData});
  }

  _renderRow = (rowData: string, sectionID: number, rowID: number, _rowData: string) => {
    //var dataSet = JSON.parse(rowData);
    console.log(this.state.nowYear);
    var name = rowData.Basics.Name;
    var gender = rowData.Basics.Gender;
    var yob = rowData.Basics.YoB;
    var breed = rowData.Basics.Breed;
    var old = this.state.nowYear - yob; 

    return(
      <View style = {styles.cellsContainer}>
      <Swipeout right={swipeoutBtns}
        backgroundColor = {'white'}>
        <TouchableOpacity style = {{height: 70, marginLeft: 19, marginTop: 0, flexDirection: 'row', alignItems: 'center'}} 
          activeOpacity = {0.9}
          onPressIn = {this.onPressDog.bind(this, rowData)}>
          <Image style = {{marginLeft: 0, height: 54, width: 54, borderRadius:27, resizeMode: 'stretch'}}
            source = {require('../ios/dog_pic.png')}/>
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


  render(){
    return(
    <View style = {styles.container}>
      <View style = {styles.topBarContainer}>
        <TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
          onPress = {Actions.pop}>
          <Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
            source = {require('../ios/goBack.png')}/>
        </TouchableOpacity>
        <Text style = {styles.topBarText}>My Dogs</Text>
      </View>
      <View style = {styles.listviewContainer}>
        <ListView style = {styles.cellsContainer}
              dataSource={this.state.dataSource}
                renderRow={this._renderRow}/>
      </View>
      <TouchableOpacity style = {styles.buttonAdd}
        activeOpacity = {0.9}
        onPress = {()=>Actions.editDogs({title: 'Add Dog', initialPage: 0, data: emptyObj[0]})}>
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