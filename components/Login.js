'use strict';
import React, {Component, propTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  DeviceEventEmitter,
  StatusBar,
  Dimensions,
  AlertIOS,
} from 'react-native';

let windowSize = Dimensions.get('window');

var LoginPage = React.createClass({

	getInitialState: function() {
	  return {
	    username: '',
	    password: '',
      needToRegister: false,
      loginHide: true,
      registerHide: false,
      firstVist: false,
        
      topBarOpacity: new Animated.Value(0),
      logoSlidePosition: new Animated.Value(219),
      loginSlideUpPosition: new Animated.Value(400),
      loginSlideHorizontalPosition: new Animated.Value(0),
      orLineSlideUpPosition: new Animated.Value(11),
      lineOpacity: 1,

      registerSlideHoriziontalPosition: new Animated.Value(-500),
      firstName: '',
      lastName:'',
      registerEmail:'',
      phoneNumber:'',
      registerPassword: '',
      contentOffset: {x: 0, y: 0},

    	}
  },

  componentDidMount: function(){
    StatusBar.setHidden(false, null);
    this.setState({lineOpacity: 1});
    this.setState({needToRegister: false});
    Animated.timing(this.state.topBarOpacity, {
        toValue: 1,
        duration: 400,
     }).start();


    Animated.timing(this.state.logoSlidePosition, {
        toValue: 60, // 目标值
        duration: 400,
        delay: 400,
        easing: Easing.linear, // 动画时间
      }).start();
      
    Animated.timing(this.state.loginSlideUpPosition, {
        toValue: 60, // 目标值
        duration: 400,
        delay: 400,
        easing: Easing.linear, // 动画时间
      }).start();

    Animated.timing(this.state.loginSlideHorizontalPosition, {
        toValue: 19, // 目标值
        duration: 0,
        //delay: 400,
        easing: Easing.linear, // 动画时间
      }).start();
  },


  textInputFocused(event){
    this.setState({
      contentOffset:{
        x: 0,
        y: 20,
      }
    });
  },

  textInputBlur(event){
    this.setState({
      contentOffset:{
        x: 0,
        y: 0,
      }
    });
  },

  onPressNext: function(){
    console.log(this.state.needToRegister);
    if (this.state.needToRegister === false){   
      console.log(this.state.username);
      console.log(this.state.password);
      var email = this.state.username;
      var str = email.toLowerCase();
      console.log(str);                                                                       
      fetch("http://alwaysaround.me:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email":str,
          "password": this.state.password
        }) 
       // "email="+this.state.username+"&password="+this.state.password
      }).then((response) => response.json())
        .then((responseData)=> {
          console.log(responseData);
          console.log(responseData.data.user);
          if(responseData.status.code === 2004){
            //console.log('SUCCESS');
            try {
              storage.save({
                  key: 'loginState',  
                  rawData: { 
                    userid: this.state.username,
                    first_name: responseData.data.user.first_name,
                    last_name: responseData.data.user.last_name,
                    phone_no: responseData.data.user.phone_no,
                    token: responseData.data.token,
                    avatar: responseData.data.user.avatar,
                  },
                expires: null
              });
              storage.save({
                key: 'dogslist',
                rawData:{
                  dogs: responseData.data.user.pets
                },
                expies: null
              });
              
              Actions.home({data:{
                firstName: responseData.data.user.first_name,
                lastName: responseData.data.user.last_name,
                token: responseData.data.token,
                avatar: responseData.data.user.avatar,
                phone_no: responseData.data.user.phone_no,
                //pets:responseData.data.user.pets
              }});
              
            } catch (error) {
              console.log(error);
              AlertIOS.alert(
                error.message
                );
            }
          }else if(responseData.status.code === 2003){
            AlertIOS.alert(
              'Incorrect Password',
            );
          }else if(responseData.status.code === 2002){
            AlertIOS.alert(
              'Email Is Not Registered',
            );
          }else if(responseData.status.code === 2014){
            AlertIOS.alert(
              'Email Already Registered',
            );
          }else{
            AlertIOS.alert(
              'Unknown Error'
            );
          };
          
        }).done(); 
    }else if(this.state.needToRegister === true){
      console.log("registering");
      Actions.verify({data: {phoneNumber: this.state.phoneNumber}});
      
      fetch("http://alwaysaround.me:8081/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          "first_name": this.state.firstName,
          "last_name": this.state.lastName,
          "email": this.state.registerEmail,
          "password": this.state.registerPassword,
          "phone_no": this.state.phoneNumber
        })
      }).then((response) => response.json())
        .then((responseData)=> {
          console.log(responseData);
          if(responseData.status.code === 2001){
            Actions.verify({data: {phoneNumber: this.state.phoneNumber}});
          }else{
            AlertIOS.alert("ERROR!!");
          }
          
        }).done();
        //Actions.verify({data: {phoneNumber: this.state.phoneNumber}});
        
    }
    
  },


  switchScene: function(){
    console.log("REGISTER?" + this.state.needToRegister);
    if (this.state.needToRegister === false){
      Animated.timing(this.state.loginSlideHorizontalPosition, {
          toValue: 600, // 目标值
          duration: 200,
          //delay: 400,
          easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.orLineSlideUpPosition, {
          toValue: 96, // 目标值
          duration: 400,
          //delay: 400,
          easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.logoSlidePosition, {
          toValue: 21, // 目标值
          duration: 400,
          //delay: 400,
          easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.registerSlideHoriziontalPosition, {
          toValue: 19, // 目标值
          duration: 200,
          delay: 200,
          easing: Easing.linear, // 动画时间
        }).start();
      this.setState({lineOpacity: 0});

      this.setState({
          username: '',
          password: '',
      });
      this.setState({needToRegister: !this.state.needToRegister});


    }else if((this.state.needToRegister === true)){
      Animated.timing(this.state.loginSlideHorizontalPosition, {
          toValue: 19, // 目标值
          duration: 200,
          delay: 200,
          easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.orLineSlideUpPosition, {
          toValue: 11, // 目标值
          duration: 400,
          //delay: 400,
          easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.logoSlidePosition, {
          toValue: 60, // 目标值
          duration: 400,
          //delay: 400,
          easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.registerSlideHoriziontalPosition, {
          toValue: -500, // 目标值
          duration: 200,
          //delay: 400,
          easing: Easing.linear, // 动画时间
        }).start();

      this.setState({
          firstName: '',
          lastName: '',
          registerEmail: '',
          phoneNumber: '',
          registerPassword: '',
      });

      this.setState({needToRegister: !this.state.needToRegister});

      this.timer = setTimeout(
        () => {
          this.setState({lineOpacity: 1});
        }, 300);

    };
  },

  onUserNameInput: function(event){
    this.setState({ username : event.nativeEvent.text});
  },

  onPasswordInput: function(event){
    this.setState({ password : event.nativeEvent.text});
  },

  onFirstNameInput: function(event){
    this.setState({ firstName : event.nativeEvent.text});
  },

  onLastNameInput: function(event){
    this.setState({ lastName : event.nativeEvent.text});
  },

  onRegisterEmailInput: function(event){
    this.setState({ registerEmail: event.nativeEvent.text});
  },

  onPhoneNumberInput: function(event){
    this.setState({ phoneNumber : event.nativeEvent.text});
  },

  onRegisterPasswordInput: function(event){
    this.setState({ registerPassword : event.nativeEvent.text});
  },

	render: function() {
		return(
			<ScrollView style={styles.container} scrollEnabled={false} contentOffset = {this.state.contentOffset}>
				<Image style={styles.bg} source={require('../ios/BG.png')} />

        <Animated.View style = {[styles.loginRegitser, {opacity: this.state.topBarOpacity}]}>
				  <TouchableOpacity style = {styles.leftButtonContainer}
              			onPress={this.switchScene}>
                    <Text style = {styles.leftButton}>{(this.state.needToRegister) ?  "EXISTING USER":"NEW USER" }</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.rightButtonContainer}
                    onPress={this.onPressNext}>
                    <Text style = {styles.rightButton}>DONE</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.logoContainer, {marginTop: this.state.logoSlidePosition}]}>
          <Image source={require('../ios/logo.png')}/>
        </Animated.View>

        <Animated.View style = {[styles.loginContainer, {marginTop: this.state.loginSlideUpPosition}, {marginLeft: this.state.loginSlideHorizontalPosition}]}>
          <View style = {styles.loginInputsContainer}>
            <Text style = {styles.emailText}>Email</Text>
            <TextInput style = {styles.emailInput}
              value={this.state.username}
              onChange = {this.onUserNameInput}
              keyboardType = {'email-address'}
              />
          </View>
          <View style = {[styles.lineContainer, {opacity: this.state.lineOpacity}]}/>
          <View style = {styles.loginInputsContainer}>
            <Text style = {styles.passwordText}>Password</Text>
            <TextInput style = {styles.passwordInput}
              secureTextEntry={true}
              value={this.state.password}
              onChange = {this.onPasswordInput}
              />
          </View>
        </Animated.View>

        <Animated.View style = {[styles.registerContainer, {left: this.state.registerSlideHoriziontalPosition}]}>
          <View style = {styles.registerInputContainer}>
            <Text style = {{
              marginLeft: 12,
              fontSize: 18,
              color: '#727272',
              fontFamily: 'SanFranciscoDisplay-Medium',
              //marginTop: 8,
            }}>First Name</Text>
            <TextInput style = {{
              width: 230,
              height: 36,
              //backgroundColor: 'blue',
              marginLeft: 8,
              marginTop: 1,
              fontSize: 18,
              fontFamily: 'SanFranciscoDisplay-Medium',
              color: '#727272'
              }}
              value={this.state.firstName}
              onChange = {this.onFirstNameInput}
              />
          </View>
          <View style = {styles.lineContainer}/>
          <View style = {styles.registerInputContainer}>
            <Text style = {{
              marginLeft: 14,
              fontSize: 18,
              color: '#727272',
              fontFamily: 'SanFranciscoDisplay-Medium',
              //marginTop: 8,
            }}>Last Name</Text>
            <TextInput style = {{
              width: 230,
              height: 36,
              //backgroundColor: 'blue',
              marginLeft: 8,
              marginTop: 1,
              fontSize: 18,
              fontFamily: 'SanFranciscoDisplay-Medium',
              color: '#727272'
              }}
              value={this.state.lastName}
              onChange = {this.onLastNameInput}
            />
          </View>
          <View style = {styles.lineContainer}/>
          <View style = {styles.registerInputContainer}>
            <Text style = {{
              marginLeft: 54,
              fontSize: 18,
              color: '#727272',
              fontFamily: 'SanFranciscoDisplay-Medium',
              //marginTop: 6,
            }}>Email</Text>
            <TextInput style = {{
              width: 230,
              height: 36,
              //backgroundColor: 'blue',
              marginLeft: 8,
              marginTop: 1,
              fontSize: 18,
              fontFamily: 'SanFranciscoDisplay-Medium',
              color: '#727272'
              }}
              value={this.state.registerEmail}
              onChange = {this.onRegisterEmailInput}
              placeholder = "name@example.com"
              placeholderTextColor = '#B6B6B6'
              keyboardType = {'email-address'}
              />
          </View>
          <View style = {styles.lineContainer}/>
          <View style = {styles.registerInputContainer}>
            <Text style = {{
              marginLeft: 45,
              fontSize: 18,
              color: '#727272',
              fontFamily: 'SanFranciscoDisplay-Medium',
              //marginTop: 8,
            }}>Mobile</Text>
            <TextInput style = {{
              width: 230,
              height: 36,
              //backgroundColor: 'blue',
              marginLeft: 8,
              marginTop: 1,
              fontSize: 18,
              fontFamily: 'SanFranciscoDisplay-Medium',
              color: '#727272'
              }}
              value={this.state.phoneNumber}
              onChange = {this.onPhoneNumberInput}
              keyboardType = {'phone-pad'}
              />
          </View>
          <View style = {styles.lineContainer}/>
          <View style = {styles.registerInputContainer}>
            <Text style = {{
              marginLeft: 20,
              fontSize: 18,
              color: '#727272',
              fontFamily: 'SanFranciscoDisplay-Medium',
              paddingTop: -1
              }}>Password</Text>
            <TextInput style = {{
              width: 230,
              height: 36,
              //backgroundColor: 'blue',
              marginLeft: 8,
              marginTop: 2,
              fontSize: 16,
              fontFamily: 'SanFranciscoDisplay-Medium',
              color: '#727272',
              paddingTop: -1
              }}
              placeholder = "Min 5 Characters"
              placeholderTextColor = '#B6B6B6'
              secureTextEntry={true}
              value={this.state.registerPassword}
              onChange = {this.onRegisterPasswordInput}
              />
          </View>

        </Animated.View>
        <Animated.View style = {[styles.orLine, {marginTop: this.state.orLineSlideUpPosition}]}>
          <Image source={require('../ios/OR.png')}/>
        </Animated.View>
        <TouchableOpacity style = {styles.fbLogin}
            onPress = {this.facebookLogin}>
          <Image source={require('../ios/FACEBOOK.png')}/>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.forgetPassword}>
          <Text style = {styles.forgetPasswordText}>{(this.state.needToRegister) ?  "FORGET PASSWORD?":"By continue you agree to our terms, conditions and privacy policy" }</Text>
        </TouchableOpacity>
      </ScrollView>



			)
	},
	
});


var styles = StyleSheet.create({
	container: {
    flexDirection: 'column',
    flex: 1,
    },

    bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: windowSize.width,
      height: windowSize.height
    },

    mainComponents:{
      flexDirection: 'column',
    },

    logoContainer:{
      marginTop: 60,
      marginLeft: 150,
    },

    loginRegitser:{
      flexDirection: 'row',
      marginLeft: 19,
      marginTop: 30,
    },

    leftButtonContainer:{
      alignSelf: 'flex-start',
    },

    leftButton:{
      color: '#FFC927',
      fontSize: 16,
      fontFamily: 'SanFranciscoDisplay-Medium',
    },

    rightButtonContainer:{
      position: 'absolute',
      top: 0,
      right: 19,
      //alignSelf: 'flex-end',
    },

    rightButton:{
      color: '#FFC927',
      fontSize: 16,
      fontFamily: 'SanFranciscoDisplay-Medium',
    },

    loginContainer:{
      //marginLeft: 19,
      marginRight: 19,
      marginTop: 56,
      height: 73,
      //width: 337,
      borderRadius: 2,
      backgroundColor: 'white',
      shadowOpacity: 0.2,
      shadowRadius: 0.6,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 0.5} 
    },

    lineContainer:{
      backgroundColor: '#B6B6B6',
      width: 337,
      height: 1,
      //alignSelf: 'center',
      //justifyContent: 'center'
    },

    loginInputsContainer:{
      flexDirection: 'row',
      width: 337,
      height:36,
      alignItems: 'center'
      //backgroundColor: 'blue',
    },

    emailText: {
      marginLeft: 46,
      fontSize: 18,
      color: '#727272',
      fontFamily: 'SanFranciscoDisplay-Medium',
      //marginTop: 8,
      backgroundColor: 'transparent'
    },

    emailInput:{
      width: 230,
      height: 36,
      //backgroundColor: 'blue',
      marginLeft: 29,
      marginTop: 1,
      fontSize: 16,
      fontFamily: 'SanFranciscoDisplay-Medium',
    },

    passwordText:{
      marginLeft: 12,
      fontSize: 18,
      color: '#727272',
      fontFamily: 'SanFranciscoDisplay-Medium',
      paddingTop: -1,
      backgroundColor: 'transparent'
    },

    passwordInput:{
      width: 230,
      height: 36,
      //backgroundColor: 'red',
      marginLeft: 29,
      marginTop: 1.5,
      fontSize: 16,
      fontFamily: 'SanFranciscoDisplay-Medium',
      //justifyContent: 'center'
    },


    registerContainer:{
      position: 'absolute',
      left: 19,
      right: 19,
      top: 185,
      //marginLeft: -500,
      //marginRight: 19,
      //marginTop: 27,
      height: 184,
      width: 337,
      borderRadius: 2,
      backgroundColor: 'white',
      shadowOpacity: 0.2,
      shadowRadius: 0.6,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 0.5} 
    },

    registerInputContainer:{
      flexDirection: 'row',
      width: 337,
      height:36,
      alignItems: 'center'
    },

    orLine:{
      marginTop: 11,
      alignSelf:'center',
    },

    fbLogin:{
      marginLeft: 19,
      marginTop: 9,
      justifyContent: 'center'
    },

    forgetPassword:{
      marginTop: 9,
      justifyContent: 'center',
      alignItems: 'center',
    },

    forgetPasswordText:{
      color: '#FFC927',
      fontSize: 12,
      fontFamily: 'SanFranciscoDisplay-Regular',
      width: 125,
      flexWrap: 'wrap',
      textAlign: 'center'
    },


});

module.exports = LoginPage;