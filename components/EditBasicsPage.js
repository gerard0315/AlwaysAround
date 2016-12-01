'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS, TextInput, CameraRoll} from 'react-native';
import SimplePicker from 'react-native-simple-picker';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const optionYears = ['2016', '2015', '2014', '2013', '2012', '2011', '2010'];
const optionSizes = ['Small, 0-20lb (0-10kg)', 'Medium, 21-40lb (10-20kg)', 'Large, 41-80lb (20-40kg)', 'Extra Large, 81lb and above (40kg and above)']

export default class EditBasics extends Component{
    static propTypes = {
        data: React.PropTypes.object.isRequired,
        onNext: React.PropTypes.func,
        onChosenPic: React.PropTypes.func,
    }; 

    constructor(props){
    	super(props);
    	this.state = {
        avatarSource: "",
        maleBgColor: '#62C6C6',
        femaleBgColor: 'white',
        maleTextColor: 'white',
        femaleTextColor: '#F49A9A',
        source_v: null,
        source_s: null,
        source_f: null,
        name: this.props.data.name,
        gender: this.props.data.gender,
        breed: this.props.data.breed,
        yearOfBirth: this.props.data.yob,
        dogSize: this.props.data.size,   
        _Vaccination: this.props.data.vac_uptodate,
        _Spay: this.props.data.spayed,
        _Friendly: this.props.data.friendly_to_dogs,
        description: "",
        selectedYearValue: null,
        selectedYoB: false,
        selectedSizeValue: null,
        selectedSize: false,
        token: "",
        genderText: "",
        n: 0,
        disNextButton: true,
    	};
  	}

    componentDidMount(){

    }

    componentWillMount(){
      if (this.state.gender === 'male'){
        this.setState({male: true});
        
      }else if(this.state.gender === 'female'){
        this.setState({male: false});
      }else{
        this.setState({male: true});
      }

      if (this.state._Vaccination === false){
        this.setState({source_v: require('../ios/BLANK_ICON.png')});
      }else if(this.state._Vaccination === true){
        this.setState({source_v: require('../ios/check_green.png')});
      }else{
        this.setState({_Vaccination: false})
        this.setState({source_v: require('../ios/BLANK_ICON.png')});
      }

      if (this.state._Spay === false){
        this.setState({source_s: require('../ios/BLANK_ICON.png')});
      }else if(this.state._Spay === true){
        this.setState({source_s: require('../ios/check_green.png')});
      }else{
        this.setState({_Spay: false})
        this.setState({source_s: require('../ios/BLANK_ICON.png')});
      }

      if (this.state._Friendly === false){
        this.setState({source_f: require('../ios/BLANK_ICON.png')});
      }else if(this.state._Friendly === true){
        this.setState({source_f: require('../ios/check_green.png')});
      }else{
        this.setState({_Friendly: false})
        this.setState({source_f: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.yearOfBirth === null){
        this.setState({selectedYearValue: 'Year of birth*'});
      }else{
        this.setState({selectedYearValue: this.state.yearOfBirth});
        this.setState({selectedYoB: true});
      }

      if (this.state.dogSize === ""){
        this.setState({selectedSizeValue: "Dog's Size*"});
      }else{
        this.setState({selectedSizeValue: this.state.dogSize});
        this.setState({selectedSize: true});
      }

      if(this.props.data.avatar === ""){
        this.setState({avatarSource: require('../ios/default.png')});
      }else{
        this.setState({avatarSource: {uri: "http://alwaysaround.me:8081/public/img/" + this.props.data.avatar}})
      }

    }
  
    onPressV(event){
      console.log("Vacination is:" + this.state._Vaccination);
      
      if(this.state._Vaccination === true){
        console.log("changing to FALSE");
        this.setState({source_v: require('../ios/BLANK_ICON.png')});
        this.setState({ _Vaccination: false})
      }else{
        console.log("changing to TRUE");
        this.setState({source_v: require('../ios/check_green.png')});
        this.setState({ _Vaccination: true});
      }
      //this.setState({ source_v: (this.state._Vaccination) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
    }

    onPressS(event){
      if(this.state._Spay === true){
        console.log("changing to FALSE");
        this.setState({source_s: require('../ios/BLANK_ICON.png')});
        this.setState({ _Spay: false})
      }else{
        console.log("changing to TRUE");
        this.setState({source_s: require('../ios/check_green.png')});
        this.setState({ _Spay: true});
      }
      //this.setState({ _Spay: !this.state._Spay});
      //this.setState({ source_s: (this.state._Spay) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
    }

    onPressF(event){
      if(this.state._Friendly === true){
        console.log("changing to FALSE");
        this.setState({source_f: require('../ios/BLANK_ICON.png')});
        this.setState({ _Friendly: false})
      }else{
        console.log("changing to TRUE");
        this.setState({source_f: require('../ios/check_green.png')});
        this.setState({ _Friendly: true});
      }
      //this.setState({ _Friendly: !this.state._Friendly});
      //this.setState({ source_f: (this.state._Friendly) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
      //console.log(this.state._Friendly);
    }

    onPressMale(){
      this.setState({male: true});
      this.setState({genderText: 'male'});
    }

    onPressFemale(){
      this.setState({male: false});
      this.setState({genderText: 'female'});
    }

    onChangeDescription(event){
      this.setState({description: event.nativeEvent.text});
    }

    onChangenName(event){
      this.setState({name: event.nativeEvent.text});
    }

    onChangenBreed(event){
      this.setState({breed: event.nativeEvent.text});
    }

    onPressSave(){
      var tempSize = this.state.selectedSizeValue.split("(");
      var sizeText = tempSize[0];
      var label = 1;
      var genderText = ""
      if (this.state.male === true){
        genderText = "male";
      }else{
        genderText = "female";
      }

      var basic= {
          name: this.state.name,
          description: this.state.description,
          gender: genderText,
          yob: Number(this.state.selectedYearValue),
          breed: this.state.breed,
          vac_uptodate: this.state._Vaccination,
          spayed: this.state._Spay,
          friendly_to_dogs: this.state._Friendly,
          size: sizeText}

      this.props.onNext(label, basic);

    }

    onPressAvatar(){
      ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true
      }).then(image => {
        //console.log(image.path);
        this.setState({avatarSource: {uri: image.path}});
        this.props.onChosenPic(image.path);
      });
    }

    renderSaveButton(){
      console.log("checking render");
      if (this.state.name != "" && this.state.breed != "" && this.state.selectedSize != false && this.state.selectedYoB != false){
        //this.setState({activeNextButton: false});
        return(
          <TouchableOpacity 
            activeOpacity = {0.8}
            disabled = {false}
            onPress = {this.onPressSave.bind(this)}>
            <Image source = {require('../ios/next.png')}/>
          </TouchableOpacity>
          )
      }else{
        console.log("no data render gray");
        //this.setState({activeNextButton: true});
        return(
          <TouchableOpacity 
            activeOpacity = {0.8}
            disabled = {false}
            onPress = {this.onPressSave.bind(this)}>
            <Image source = {require('../ios/nect_incom.png')}/>
          </TouchableOpacity>
          )
      }
    }

    render(){
      console.log("rendering");
      return(
      <View style = {styles.container}>
        <View style = {styles.shadow}/>
        <Image style = {styles.bg} source = {require('../ios/BG.png')}/>
        <View style = {{marginTop: 0, marginLeft: 0, width: 375, height: 5, backgroundColor: 'transparent'}}/>
        <View style = {styles.avatarName}>
          <TouchableOpacity style = {styles.avatarContainer}
            onPress = {this.onPressAvatar.bind(this)}>
            <Image style = {styles.avatar} source = {this.state.avatarSource}/>
          </TouchableOpacity>
          <View style = {styles.nameInputContainer}>
            <TextInput style = {[styles.infoInput, {marginLeft: 10, color: '#727272'}]}
              value = {this.state.name}
              placeholder = {"Dog's Name*"}
              placeholderColor= {'#B6B6B6'}
              onChange = {this.onChangenName.bind(this)}/>
          </View>          
        </View>
        <View style = {styles.genderChoice}>
          <TouchableOpacity style = {[styles.genderSelecor, {backgroundColor: (this.state.male)? '#62C6C6': 'white' }]} 
            activeOpacity = {1}
            onPress = {this.onPressMale.bind(this)}>
            <Text style = {[styles.genderText, {color: (this.state.male)? 'white': '#62C6C6'}]}>Male</Text>
          </TouchableOpacity>
          <View style ={{marginLeft: 0, width: 9}}/>
          <TouchableOpacity style = {[styles.genderSelecor, {backgroundColor: (this.state.male)? 'white': '#F49A9A' }]}
            activeOpacity = {1}
            onPress = {this.onPressFemale.bind(this)}>
            <Text style = {[styles.genderText, {color: (this.state.male)? '#F49A9A': 'white'}]}>Female</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.infoInputContainer}>
            <TextInput style = {[styles.infoInput, {marginLeft: 10, color: '#727272',}]}
              value = {this.state.breed}
              placeholder = {"Breed*"}
              placeholderColor= {'#B6B6B6'}
              onChange = {this.onChangenBreed.bind(this)}/>
        </View>
        <View style = {styles.infoInputContainer}>
            <Text style = {[styles.infoInput, {backgroundColor: 'transparent', marginLeft: -165, color: (this.state.selectedYoB)? '#727272':'#B6B6B6'}]} onPress = {() => {this.refs.pickerYear.show();}}>{this.state.selectedYearValue}</Text>
        </View>
        <View style = {styles.infoInputContainer}>
            <Text style = {[styles.infoInput, {backgroundColor: 'transparent', marginLeft: -165, color: (this.state.selectedSize)? '#727272':'#B6B6B6'}]} onPress = {() => {this.refs.pickerSize.show();}}>{this.state.selectedSizeValue}</Text>
        </View>
        <View style = {{marginTop: 10, width: 337, height:1, backgroundColor: 'white', marginLeft: 19}}/>
          <TouchableOpacity style= {styles.checkBoxCol}
            onPress = {this.onPressV.bind(this)}
            activeOpacity = {1} >
              <Text style = {styles.infoText}>Vaccination</Text>
                <View style = {styles.checkBoxStyle}>
                <View style = {styles.checkBox}>            
                  <Image style = {styles.checkImage}
                      source = {this.state.source_v}/>
                </View>
              </View>
          </TouchableOpacity>

          <TouchableOpacity style= {styles.checkBoxCol}
            onPress = {this.onPressS.bind(this)}
            activeOpacity = {1}>
            <Text style = {styles.infoText}>Neutered/Spayed</Text>
              <View style = {styles.checkBoxStyle}>
                <View style = {styles.checkBox}>            
                  <Image style = {styles.checkImage}
                      source = {this.state.source_s}/>
                </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style= {styles.checkBoxCol}
            onPress = {this.onPressF.bind(this)}
            activeOpacity = {1}>
            <Text style = {styles.infoText}>Friendly With Other Dogs</Text>
              <View style = {styles.checkBoxStyle}>
                <View style = {styles.checkBox}>            
                  <Image style = {styles.checkImage}
                      source = {this.state.source_f}/>
                </View>
            </View>
          </TouchableOpacity>
        <View style = {{marginTop: 10, width: 337, height:1, backgroundColor: 'white', marginLeft: 19}}/>
        <TextInput style = {styles.introInput}
            multiline = {true}
            placeholder = " Briefly Describe Your Dog"
            placeholderTextColor = '#B6B6B6'
            value = {this.state.description}
            onChange = {this.onChangeDescription.bind(this)}
            />

        <View style = {styles.buttonSave}>
          {this.renderSaveButton()}
        </View>

        <SimplePicker
          ref={'pickerYear'}
          options={optionYears}
          onSubmit={(option) => {
            this.setState({
              selectedYearValue: option,
              selectedYoB: true
            });
          }}
        />

        <SimplePicker
          ref={'pickerSize'}
          options={optionSizes}
          onSubmit={(option) => {
            this.setState({
              selectedSizeValue: option,
              selectedSize: true
            });
          }}
        />

      </View>
    )}

}


var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 23, 
    marginLeft: 0, 
    width: 375,
    height: 573,
    backgroundColor: 'white'
  },

  shadow:{
    position: 'absolute',
    left: 0,
    top: 0,
    height: 0.6,
    right:0,
    backgroundColor: 'black',
    opacity: 0.5
  },

  bg:{
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    //resizeMode: 'stretch'
  },

  avatarName:{
    marginTop: 0,
    marginLeft: 19,
    width: 337,
    height: 84,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center'
  },

  avatarContainer:{
    height: 54,
    width: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: '#B6B6B6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  avatar:{
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'cover',
    alignSelf: 'center'   
  },

  nameInputContainer:{
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#B6B6B6',
    width: 160,
    height: 36,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  infoInput: {
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Medium',
    //color: '#727272',
    //paddingLeft: 10,
    height: 20,
    width: 150,
    //width: 300,
    borderRadius: 2,
    //backgroundColor: 'red'
  },

  genderChoice:{
    height: 36,
    width: 337,
    marginLeft: 19,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },

  genderSelecor: {
    height: 36,
    width: 164,
    borderRadius: 2,
    //borderWidth: 1,
    //borderColor: 'white',
    marginLeft: 0,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  genderText:{
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Medium'
  },

  infoInputContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#B6B6B6',
    width: 337,
    height: 36,
    marginLeft: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2  
  },

  checkBoxCol:{
    flexDirection: 'row',
    height: 20,
    marginLeft: 19,
    marginTop:10,
    width: 337,
    justifyContent:'space-between'
    //backgroundColor: '#E15667',
  },

  checkBox:{
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#62C6C6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  checkImage:{
    height: 19,
    width: 19,
    borderRadius: 9.5,
    resizeMode: 'cover'
    //marginBottom: 10,
  },

  checkBoxStyle:{
    flex: 1,
    alignItems: 'flex-end',
  },

  infoText:{
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Medium',
    color: 'white',
    backgroundColor: 'transparent'
  },

  introInput:{
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 19,
    marginRight: 19,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: '#727272',
    borderColor: '#B6B6B6',
    height: 100,
    backgroundColor: 'white'
  },

  buttonSave:{
    position: 'absolute',
    left: 19,
    right: 19,
    bottom: 10,
    borderRadius: 6,
    backgroundColor: 'white'
  },

  dropdown: {
    width: 300,
    marginLeft: -10,
    //borderColor: '#999',
    //borderWidth: 1,
    padding: 5,
    backgroundColor: 'transparent',
  },

  dropdownOptions: {
    
    position: 'absolute',
    //top: -10,
    left: 19,
    width: 337,
    height: 100,
    
    //marginTop: -100,
    //height: 100,
    //width: 300,
    //marginLeft: 150
  },

  optionText:{
    fontSize: 15,
    fontFamily: 'SanFranciscoDisplay-Regular',
    color: '#727272',
    backgroundColor: 'transparent'   
  }
});