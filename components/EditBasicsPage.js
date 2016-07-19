'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS, TextInput} from 'react-native';
//import DropDown, {Select, Option, OptionList, updatePosition} from 'react-native-dropdown';
import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-menu';

export default class EditBasics extends Component{
    static propTypes = {
        data: React.PropTypes.object.isRequired,
    }; 

    constructor(props){
    	super(props);
    	this.state = {
        avatarSource: require('../ios/default.png'),
        maleBgColor: '#62C6C6',
        femaleBgColor: 'white',
        maleTextColor: 'white',
        femaleTextColor: '#F49A9A',
        source_v: null,
        source_s: null,
        source_f: null,
        name: this.props.data.Name,
        gender: this.props.data.Gender,
        breed: this.props.data.Breed,
        yearOfBirth: this.props.data.YoB,
        dogSize: this.props.data.Size,   
        _Vaccination: this.props.data.Vacination,
        _Spay: this.props.data.Spayed,
        _Friendly: this.props.data.Friendly,

    	};
  	}

    componentWillMount(){
      if (this.state.gender === 'Male'){
        this.setState({male: true});
        this.setState({selectedSize: true});
        this.setState({selectedYoB: true});
      }else if(this.state.gender === 'Female'){
        this.setState({male: false});
        this.setState({selectedSize: false});
        this.setState({selectedYoB: false});
      }
      console.log(this.state._Vaccination);
      if (this.state._Vaccination === false){
        this.setState({source_v: require('../ios/BLANK_ICON.png')});
      }else if(this.state._Vaccination === true){
        this.setState({source_v: require('../ios/check_green.png')});
      }
      if (this.state._Spay === false){
        this.setState({source_s: require('../ios/BLANK_ICON.png')});
      }else if(this.state._Spay === true){
        this.setState({source_s: require('../ios/check_green.png')});
      }
      if (this.state._Friendly === false){
        this.setState({source_f: require('../ios/BLANK_ICON.png')});
      }else if(this.state._Friendly === true){
        this.setState({source_f: require('../ios/check_green.png')});
      }

    }
  
    onPressV(event){
      this.setState({ _Vaccination: !this.state._Vaccination});
      this.setState({ source_v: (this.state._Vaccination) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
      //console.log(this.state._Vaccination);
    }

    onPressS(event){
      this.setState({ _Spay: !this.state._Spay});
      this.setState({ source_s: (this.state._Spay) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
          console.log(this.state.dogName);
          console.log('name above');
    }

    onPressF(event){
      this.setState({ _Friendly: !this.state._Friendly});
      this.setState({ source_f: (this.state._Friendly) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
      //console.log(this.state._Friendly);
    }

    onPressMale(){
      this.setState({male: true});
    }

    onPressFemale(){
      this.setState({male: false});
    }

    onSelectYoB(value){
      this.setState({ yearOfBirth: value});
      if(this.state.yearOfBirth != 'Year of birth*'){
        this.setState({selectedYoB: true});
      }else{
        this.setState({selectedYoB: false});
      }
    }

    render(){
      return(
      <View style = {styles.container}>
        <View style = {styles.shadow}/>
        <Image style = {styles.bg} source = {require('../ios/BG.png')}/>
        <View style = {{marginTop: 0, marginLeft: 0, width: 375, height: 5, backgroundColor: 'transparent'}}/>
        <MenuContext style = {{flex: 1}}>
        <View style = {styles.avatarName}>
          <TouchableOpacity style = {styles.avatarContainer}>
            <Image style = {styles.avatar} source = {this.state.avatarSource}/>
          </TouchableOpacity>
          <View style = {styles.nameInputContainer}>
            <TextInput style = {[styles.infoInput, {marginLeft: 10, color: '#727272'}]}
              value = {this.state.name}
              placeholder = {"Dog's Name*"}
              placeholderColor= {'#B6B6B6'}/>
          </View>          
        </View>
        <View style = {styles.genderChoice}>
          <TouchableOpacity style = {[styles.genderSelecor, {backgroundColor: (this.state.male)? '#62C6C6': 'white' }]} 
            activeOpacity = {1}
            onPress = {this.onPressMale.bind(this)}>
            <Text style = {[styles.genderText, {color: (this.state.male)? 'white': '#F49A9A'}]}>Male</Text>
          </TouchableOpacity>
          <View style ={{marginLeft: 0, width: 9}}/>
          <TouchableOpacity style = {[styles.genderSelecor, {backgroundColor: (this.state.male)? 'white': '#62C6C6' }]}
            activeOpacity = {1}
            onPress = {this.onPressFemale.bind(this)}>
            <Text style = {[styles.genderText, {color: (this.state.male)? '#F49A9A': 'white'}]}>Female</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.infoInputContainer}>
            <TextInput style = {[styles.infoInput, {marginLeft: 10, color: '#727272',}]}
              value = {this.state.breed}
              placeholder = {"Breed*"}
              placeholderColor= {'#B6B6B6'}/>
        </View>
          <View style = {styles.infoInputContainer}>
            <Menu style={styles.dropdown} onSelect={(value) => this.setState({ yearOfBirth: value, selectedYoB: true})}>
                <MenuTrigger>
                <Text style = {styles.infoInput, {marginLeft: -7, fontSize: 16, fontFamily: 'SanFranciscoDisplay-Medium', color: (this.state.selectedYoB)? '#727272': '#B6B6B6'}}>{this.state.yearOfBirth}</Text>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.dropdownOptions}
                  renderOptionsContainer={(options) => <ScrollView><Text style = {[styles.optionText, {marginLeft: 10, marginTop: 10}]}>CHOOSE YEAR OF BIRTH</Text>{options}</ScrollView>}>
                  <MenuOption value="2012">
                    <Text style = {styles.optionText}>2012</Text>
                  </MenuOption>
                  <MenuOption value="2015">
                    <Text style = {styles.optionText}>2015</Text>
                  </MenuOption>
                  <MenuOption value="2016">
                    <Text style = {styles.optionText}>2016</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
          </View>
          <View style = {styles.infoInputContainer}>
            <Menu style={styles.dropdown} onSelect={(value) => this.setState({ dogSize: value, selectedSize: true})}>
                <MenuTrigger>
                <Text style = {styles.infoInput, {marginLeft: -7, fontSize: 16, fontFamily: 'SanFranciscoDisplay-Medium', color: (this.state.selectedSize)? '#727272': '#B6B6B6'}}>{this.state.dogSize}</Text>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.dropdownOptions}
                  renderOptionsContainer={(options) => <ScrollView><Text style = {[styles.optionText, {marginLeft: 10, marginTop: 10}]}>CHOOSE DOG'S SIZE</Text>{options}</ScrollView>}>
                  <MenuOption value="Small">
                    <Text style = {styles.optionText}>Small</Text>
                  </MenuOption>
                  <MenuOption value="Medium">
                    <Text style = {styles.optionText}>Medium</Text>
                  </MenuOption>
                  <MenuOption value="Large">
                    <Text style = {styles.optionText}>Large</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
          </View>
        <View style = {{marginTop: 10, width: 337, height:1, backgroundColor: 'white', marginLeft: 19}}/>
          <View style= {styles.checkBoxCol}>
            <Text style = {styles.infoText}>Vaccination</Text>
              <View style = {styles.checkBoxStyle}>
                <TouchableOpacity 
                  style = {styles.checkBox}
                  onPress = {this.onPressV.bind(this)}
                  activeOpacity = {1}
                  >            
                  <Image style = {styles.checkImage}
                      source = {this.state.source_v}/>
                </TouchableOpacity>
          
            </View>
          </View>
          <View style= {styles.checkBoxCol}>
            <Text style = {styles.infoText}>Neutered/Spayed</Text>
              <View style = {styles.checkBoxStyle}>
                <TouchableOpacity 
                  style = {styles.checkBox}
                  onPress = {this.onPressS.bind(this)}
                  activeOpacity = {1}
                  >            
                  <Image style = {styles.checkImage}
                      source = {this.state.source_s}/>
                </TouchableOpacity>
            </View>
          </View>
          <View style= {styles.checkBoxCol}>
            <Text style = {styles.infoText}>Friendly With Other Dogs</Text>
              <View style = {styles.checkBoxStyle}>
                <TouchableOpacity 
                  style = {styles.checkBox}
                  onPress = {this.onPressF.bind(this)}
                  activeOpacity = {1}
                  >            
                  <Image style = {styles.checkImage}
                      source = {this.state.source_f}/>
                </TouchableOpacity>
            </View>
          </View>
        <View style = {{marginTop: 10, width: 337, height:1, backgroundColor: 'white', marginLeft: 19}}/>
        <TextInput style = {styles.introInput}
            multiline = {true}
            placeholder = " Briefly Describe Your Dog"
            placeholderTextColor = '#B6B6B6'
            />
        <TouchableOpacity style = {styles.buttonSave}
          activeOpacity = {0.8}>
          <Image source = {require('../ios/save.png')}/>
        </TouchableOpacity>
      </MenuContext>
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
    //marginLeft: 10,
    height: 20,
    width: 150,
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
    borderWidth: 1,
    borderColor: '#B6B6B6',
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
    borderColor: '#B6B6B6',
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