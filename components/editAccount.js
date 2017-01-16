'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions, ActionConst} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import {StyleSheet, TextInput, Text, View, TouchableOpacity, Image, AlertIOS, Navigator, ListView, TouchableHighlight, ScrollView, Modal, CameraRoll} from 'react-native';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwicG9wdWxhdGVkIjp7InBldHMiOnsidmFsdWUiOlsiNTgxMTMxYmVkM2E5MDI0M2VhNjU5NDI1IiwiNTgxNzk1NDg4ZDAwYWUwNjRhYWIwNTg0Il0sIm9wdGlvbnMiOnsicGF0aCI6InBldHMiLCJzZWxlY3QiOiJiYXNpYy5uYW1lIiwiX2RvY3MiOnsiNTgyZTM4NWQ0MzUyMGUwMzQzM2E2MzdmIjpbIjU4MTEzMWJlZDNhOTAyNDNlYTY1OTQyNSIsIjU4MTc5NTQ4OGQwMGFlMDY0YWFiMDU4NCJdfSwiaXNWaXJ0dWFsIjpmYWxzZX19fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwicGV0cyI6ImluaXQiLCJ1cGRhdGVkQXQiOiJpbml0IiwiX192IjoiaW5pdCIsImF2YXRhciI6ImluaXQiLCJhY3RpdmF0ZWQiOiJpbml0IiwicGhvbmVfbm8iOiJpbml0IiwiZmlyc3RfbmFtZSI6ImluaXQiLCJsYXN0X25hbWUiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsidXBkYXRlZEF0Ijp0cnVlLCJfX3YiOnRydWUsInBldHMiOnRydWUsImF2YXRhciI6dHJ1ZSwiYWN0aXZhdGVkIjp0cnVlLCJwaG9uZV9ubyI6dHJ1ZSwiZmlyc3RfbmFtZSI6dHJ1ZSwibGFzdF9uYW1lIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiZW1haWwiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJwZXRzIjpbeyJfaWQiOiI1ODExMzFiZWQzYTkwMjQzZWE2NTk0MjUiLCJiYXNpYyI6eyJuYW1lIjoiUGVraW5nIn19LHsiX2lkIjoiNTgxNzk1NDg4ZDAwYWUwNjRhYWIwNTg0IiwiYmFzaWMiOnsibmFtZSI6IllpcmFuIn19XSwidXBkYXRlZEF0IjoiMjAxNi0xMi0xOFQyMzowMTozNi4zMjlaIiwiX192IjowLCJhdmF0YXIiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2Fsd2F5c2Fyb3VuZC9pbWFnZS91cGxvYWQvdjE0ODIxMDIwOTUvcWpsdnd4amJ1dnkwMWp3ZnBwbjguanBnIiwiYWN0aXZhdGVkIjpmYWxzZSwicGhvbmVfbm8iOjY0NjgzMDI3MTcsImZpcnN0X25hbWUiOiJ5aXJhbiIsImxhc3RfbmFtZSI6InRhbyIsInBhc3N3b3JkIjoiJDJhJDA1JER6cTZKNDQwUjBSSmhlSC5oMkt5WWVtWG11NDhoYTh3eEhtUFoxQWxPdzdMZXlSQldJWnd5IiwiZW1haWwiOiJ5dDI0ODdAY29sdW1iaWEuZWR1IiwiX2lkIjoiNTgyZTM4NWQ0MzUyMGUwMzQzM2E2MzdmIn0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGwsbnVsbCxudWxsXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltudWxsXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W10sIiRfX29yaWdpbmFsX3ZhbGlkYXRlIjpbXSwiJF9fb3JpZ2luYWxfcmVtb3ZlIjpbXX0sImlhdCI6MTQ4MjExMDA2NSwiZXhwIjoxNDg0NzAyMDY1fQ.ccFuj48bypUzumuushKY_KdArSrm0X1MPhuOx0EH9As';
export default class EditAccount extends Component{
	static propTypes = {
        data: React.PropTypes.object.isRequired,
    };

    constructor(props){
    	super(props);
    	this.state = {
            modalVisible: false,
            firstName: "",//this.props.data.firstName,
            lastName: "",//this.props.data.lastName,
            email: 'info@lunalabs.co.uk',
            phone_no: "",//this.props.data.phone_no.toString(),
            avatarSource: "",
            token: "",

    	};
  	}

    componentWillMount(){
        //console.log("data is " + this.props.data.phone_no)
        //this.setState({avatarSource: this.props.data.avatar})
    }

    componentDidMount(){
        storage.load({
                key: 'loginState',
                autoSync: true,
                syncInBackground: true,
            }).then(ret => {
                console.log(ret);
                //console.log(ret.token);
                //console.log(ret.first_name);
                this.setState({email: ret.userid});
                this.setState({firstName: ret.first_name});
                this.setState({token: ret.token});
                this.setState({lastName: ret.last_name});
                this.setState({pets: ret.pets})
                //this.setState({currentRoute: "LOGIN_FOUND"});
                this.setState({avatarSource: ret.avatar});
                this.setState({phone_no: ret.phone_no.toString()})
                //this.setState({render: true});
            }).catch(err => {
                console.log("error caught")
                console.warn("this is error message: " + err.message);
                this.setState({currentRoute: "LOGIN_NOT_FOUND"});
                this.setState({render: true});
            }).done();
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    onPressEdit(){
        this._setModalVisible(true);
        console.log('open modal');
    }
    saveAndReload(){
        storage.save({
            key: 'loginState',  
            rawData: { 
                userid: this.state.email,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                phone_no: this.state.phone_no,
                token: this.state.token,
                avatar: this.state.avatarSource,
            },
            expires: null
        });
    }
    onPressTakephoto(){
        //Actions.camera();
        this._setModalVisible(false);

        this.timer = setTimeout(
        () => {
            console.log("open camera");
            ImagePicker.openCamera({
              width: 500,
              height: 500,
              cropping: true
            }).then(image =>{
                console.log(image.path);
                this.setState({avatarSource: image.path});
                this.testUpload(image.path);
            });
        },1000);
        /*
        
        */
        
    }

    testUpload(uri){
      console.log("pic uri is " + uri);
      console.log(this.state.token);
      let data = new FormData()
      if (uri) {
        data.append('user', {uri: uri, name: 'image.jpg', type: 'image/jpg'});
      }
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
          "x-access-token": this.state.token
        },
        body: data,
      }

      fetch("http://alwaysaround.me:8081/api/user/avatar-upload", config).then((response) => response.json())
        .then((res)=>{
          console.log(res);
          if (res.status.code === 2015){
            this.setState({avatarSource: res.data.avatar});
            this.saveAndReload();
          }else{
              AlertIOS.alert("ERROR!!" + res.status.msg);          
          }
        }).done()

    }

    onPressFromLib(){
        //Actions.cameraRoll();
        console.log("from cameraRoll");
        this._setModalVisible(false);
        this.timer = setTimeout(
        () => {
            ImagePicker.openPicker({
                width: 500,
                height: 500,
                cropping: true
            }).then(image => {
                console.log(image.path);
                this.setState({avatarSource: image.path});
                this.testUpload(image.path);
            });
        },1000);
        /*
        
        */
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

    onPressSave(){
            Actions.home({data:{
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                token: this.state.token,
                avatar: this.state.avatarSource,
                phone_no: this.state.phone_no,
                //pets:responseData.data.user.pets
            }});

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
                    source = {{uri:this.state.avatarSource}}/>
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
                    value = {this.state.phone_no}
                    onChange = {this.onInputPhone.bind(this)}
                    />
            </View>
            <TouchableOpacity style = {styles.buttonSave}
                activeOpacity = {0.8}
                onPress = {this.onPressSave.bind(this)}>
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