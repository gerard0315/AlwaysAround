'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions, ActionConst} from 'react-native-router-flux';
import {StyleSheet, TextInput, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, CameraRoll} from 'react-native';

export default class EditAccount extends Component{
	static propTypes = {
    };

    constructor(props){
    	super(props);
    	this.state = {
            modalVisible: false,
            firstName: 'Luna',
            lastName: 'Baetylus',
            email: 'info@lunalabs.co.uk',
            phone: '07123456789',
    	};
  	}

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    onPressEdit(){
        this._setModalVisible(true);
        console.log('open modal');
    }

    onPressTakephoto(){
        Actions.camera();
        this._setModalVisible(false);
    }

    onPressFromLib(){
        //Actions.cameraRoll();
        this._setModalVisible(false);
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

    onInputFirstName(event){
        this.setState({ firstName : event.nativeEvent.text});
    }

    onInputLastName(event){
        this.setState({ lastName : event.nativeEvent.text});
    }

    onInputEmail(event){
        this.setState({ Email : event.nativeEvent.text});
    }

    onInputPhone(event){
        this.setState({ phone : event.nativeEvent.text});
    }

    onDismiss(){
        this._setModalVisible(false);
    }

    onBack(){
        Actions.settings({type: ActionConst.BACK});
    }

    render(){
        var modalBackgroundStyle = {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        };
        return(
        <ScrollView style = {styles.container} scrollEnabled = {false}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {this._setModalVisible(false)}}
              >
                <View style = {[styles.modalContainer, modalBackgroundStyle]}>
                    <TouchableOpacity style = {styles.dismissPad} onPress = {this.onDismiss.bind(this)} activeOpacity = {1}/>
                    <View style = {styles.choiceContainer}>
                        <View style  = {[styles.paddingView, {paddingTop: 10}]}/>
                        <TouchableOpacity style = {styles.button} onPress = {this.onPressTakephoto.bind(this)} activeOpacity = {0.9}>
                            <Text style = {styles.modalText}>Take Photo</Text>
                        </TouchableOpacity>
                        <View style  = {styles.paddingView}/>
                        <TouchableOpacity style = {styles.button}  activeOpacity  = {0.9}>
                            <Text style = {styles.modalText} onPress = {this.onPressFromLib.bind(this)} >Choose From Library</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Image style = {[styles.container, {resizeMode: 'stretch'}]}
                source = {require('../ios/BG.png')}/>
            <View style = {styles.topBarContainer}>
                <TouchableOpacity style ={{marginLeft: 19, marginTop: 16, height: 16, width: 16}}
                    onPress = {this.onBack}>
                    <Image style= {{marginLeft: 0, marginTop: 0, height: 16, width: 16, justifyContent: 'center'}}
                        source = {require('../ios/goBack.png')}/>
                </TouchableOpacity>
                <Text style = {styles.topBarText}>Edit Account</Text>
            </View>
            <View style = {styles.avatarContainer}>
                <Image style = {styles.avatar}
                    source = {{uri:'http://36.media.tumblr.com/c1ab83d6816fb7302a230d5ce9580446/tumblr_inline_o3bwh2h8z81sitizh_540.jpg'}}/>
                <Text style = {styles.buttonText} onPress = {this.onPressEdit.bind(this)}>Change Photo</Text>
            </View>
            <View style = {[styles.sectionContainer, {marginTop: 20}]}>
                <Text style = {[styles.sectionTitle, {width: 85, textAlign: 'right'}]}>First Name</Text>
                <TextInput style = {styles.sectionInpit}
                    value = {this.state.firstName}
                    onChange = {this.onInputFirstName.bind(this)}
                    />
            </View>
            <View style = {[styles.sectionContainer, {marginTop: 10}]}>
                <Text style = {[styles.sectionTitle, {width: 85, textAlign: 'right'}]}>Last Name</Text>
                <TextInput style = {styles.sectionInpit}
                    value = {this.state.lastName}
                    onChange = {this.onInputLastName.bind(this)}
                    />
            </View>
            <View style = {[styles.sectionContainer, {marginTop: 10}]}>
                <Text style = {[styles.sectionTitle, {width: 85, textAlign: 'right'}]}>Email</Text>
                <TextInput style = {styles.sectionInpit}
                    value = {this.state.email}
                    onChange = {this.onInputEmail.bind(this)}
                    />
            </View> 
            <View style = {[styles.sectionContainer, {marginTop: 10}]}>
                <Text style = {[styles.sectionTitle, {width: 85, textAlign: 'right'}]}>Mobile</Text>
                <TextInput style = {styles.sectionInpit}
                    value = {this.state.phone}
                    onChange = {this.onInputPhone.bind(this)}
                    />
            </View>
            <TouchableOpacity style = {styles.buttonSave}
                activeOpacity = {0.8}>
                <Image source = {require('../ios/save.png')}/>
            </TouchableOpacity>          
        </ScrollView>
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
        height: 667,
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

    avatarContainer:{
        marginTop: 20, 
        marginLeft: 19, 
        width: 337, 
        height: 64, 
        backgroundColor: 'white', 
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#B6B6B6',
        flexDirection: 'row',
        alignItems: 'center'
    },

    sectionContainer:{ 
        marginLeft: 19, 
        width: 337, 
        height: 36, 
        backgroundColor: 'white', 
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#B6B6B6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    avatar:{
        marginLeft: 15,
        //alignItems: 'center',
        //justifyContent: 'center',
        alignSelf:'center',
        width: 54,
        height: 54,
        borderRadius: 27
    },

    sectionTitle: {
        fontFamily: 'SanFranciscoDisplay-Medium',
        fontSize: 16,
        color: '#727272',
        //width: 85,
        //backgroundColor: 'red',
        //textAlign: 'right'
    },

    sectionInpit:{
        fontFamily: 'SanFranciscoDisplay-Regular',
        fontSize: 16,
        color: '#727272',
        width: 200,
        //backgroundColor: 'red',
        textAlign: 'left',
        marginLeft: 19,
        paddingTop: 3,
    },

    buttonSave:{
        position: 'absolute',
        left: 19,
        right: 19,
        top: 667-46-10
    },

    buttonText: {
        paddingLeft: 50,
        fontSize: 16,
        fontFamily: 'SanFranciscoDisplay-Medium',
        color: '#727272',
        textAlign: 'center'
    },

    choiceContainer:{
        flexDirection: 'column',
        position: 'absolute',
        height: 72 + 25,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white'
    },

    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,       
    },

    paddingView:{
        marginTop: 0,
        marginLeft: 0,
        width: 375,
        height: 5,
        backgroundColor: 'white'
    },

    button:{
        marginLeft: 19,
        marginTop: 0,
        height: 36,
        width: 337,
        backgroundColor: 0,
        borderWidth: 1,
        borderColor: '#B6B6B6',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    modalText:{
        fontSize: 16,
        fontFamily: 'SanFranciscoDisplay-Medium',
        color: '#727272',
        textAlign: 'center'
    },

    dismissPad:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 667-46-10,
    }

});