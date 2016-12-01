'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS, TextInput} from 'react-native';


export default class EditHealth extends Component{
    static propTypes = {
        data: React.PropTypes.object.isRequired,
        onSubmit: React.PropTypes.func,
    }; 

    constructor(props){
    	super(props);
    	this.state = {
            onMeds: this.props.data.medication,
            allergies: this.props.data.allergies,
            vetName: this.props.data.veterinary.name,
            vetAddress: this.props.data.veterinary.addr,
            vetPhone: this.props.data.veterinary.phone,
            insuName: this.props.data.insurance.name,
            insuNumber: this.props.data.insurance.number,        

    	}
    }

    onChangeMeds(event){
        this.setState({ onMeds : event.nativeEvent.text});
    }

    onChangeAllergies(event){
        this.setState({ allergies : event.nativeEvent.text});
    }

    onChangeVetName(event){
        this.setState({ vetName : event.nativeEvent.text});
    }

    onChangeVetAdd(event){
        this.setState({ vetAddress : event.nativeEvent.text});
    }

    onChangeVetPhone(event){
        this.setState({ vetPhone : event.nativeEvent.text});
    }

    onChangeInsuName(event){
        this.setState({ insuName : event.nativeEvent.text});
    }

    onChangeInsuNumber(event){
        this.setState({ insuNumber : event.nativeEvent.text});
    }

    onPressSave(){
        var health = {
            "medication": this.state.onMeds,
            "allergies": this.state.allergies,
            "insurance": {
              "name": this.state.insuName,
              "number": this.state.insuNumber
            },
            "veterinary": {
              "name": this.state.vetName,
              "addr": this.state.vetAddress,
              "phone": this.state.vetPhone
            }
        }
        this.props.onSubmit(health);
    }

    render(){
    	return(
    	<View style = {styles.container}>
        	<View style = {styles.shadow}/>
        	<Image style = {styles.bg} source = {require('../ios/BG.png')}/>
            <Text style = {[styles.sectionTitle, {marginTop: 30}]}>Health Information</Text>
            <View style = {[styles.infoInputContainer, {marginTop: 20}]}>
                <TextInput style = {styles.infoInput}
                    value = {this.state.onMeds}
                    placeholder = {"Is on any medication"}
                    placeholderColor= {'#B6B6B6'}
                    onChange = {this.onChangeMeds.bind(this)}/>
            </View>
            <View style = {[styles.infoInputContainer, {marginTop: 10}]}>
                <TextInput style = {styles.infoInput}
                    value = {this.state.allergies}
                    placeholder = {"Has any allergies"}
                    placeholderColor= {'#B6B6B6'}
                    onChange = {this.onChangeAllergies.bind(this)}/>
            </View>
            <Text style = {[styles.sectionTitle, {marginTop: 20}]}>Veterinary & Insurance</Text>
            <View style = {[styles.infoInputContainer, {marginTop: 20}]}>
                <TextInput style = {styles.infoInput}
                    value = {this.state.vetName}
                    placeholder = {"Veterinary name"}
                    placeholderColor= {'#B6B6B6'}
                    onChange = {this.onChangeVetName.bind(this)}/>
            </View>
            <View style = {[styles.infoInputContainer, {marginTop: 10}]}>
                <TextInput style = {styles.infoInput}
                    value = {this.state.vetAddress}
                    placeholder = {"Veterinary address"}
                    placeholderColor= {'#B6B6B6'}
                    onChange = {this.onChangeVetAdd.bind(this)}/>
            </View>
            <View style = {[styles.infoInputContainer, {marginTop: 10}]}>
                <TextInput style = {styles.infoInput}
                    value = {this.state.vetPhone}
                    placeholder = {"Veterinary phone number"}
                    placeholderColor= {'#B6B6B6'}
                    onChange = {this.onChangeVetPhone.bind(this)}/>
            </View>
            <View style = {[styles.infoInputContainer, {marginTop: 10}]}>
                <TextInput style = {styles.infoInput}
                    value = {this.state.insuName}
                    placeholder = {"Insurance name"}
                    placeholderColor= {'#B6B6B6'}
                    onChange = {this.onChangeInsuName.bind(this)}/>
            </View>
            <View style = {[styles.infoInputContainer, {marginTop: 10}]}>
                <TextInput style = {styles.infoInput}
                    value = {this.state.insuNumber}
                    placeholder = {"Insurance number"}
                    placeholderColor= {'#B6B6B6'}
                    onChange = {this.onChangeInsuNumber.bind(this)}/>
            </View>
            <TouchableOpacity style = {styles.buttonSave}
              activeOpacity = {0.8}
              onPress = {this.onPressSave.bind(this)}>
              <Image source = {require('../ios/save.png')}/>
            </TouchableOpacity>

        </View>
    )
    }

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

  sectionTitle:{
    marginLeft: 19,
    fontSize: 18,
    fontFamily: 'SanFranciscoDisplay-Medium',
    color: '#FFC927',
    backgroundColor: 'transparent'
  },

  infoInputContainer: {
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

  infoInput: {
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Medium',
    color: '#727272',
    marginLeft: 10,
    height: 20,
    width: 300,
    borderRadius: 2,
    //backgroundColor: 'red'
  },

  buttonSave:{
    position: 'absolute',
    left: 19,
    right: 19,
    bottom: 10,
  }
  });