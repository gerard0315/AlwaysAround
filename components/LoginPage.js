'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import Toggle from 'react-native-toggle';
import MainPage from './MainPage.js'
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


var {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  DeviceEventEmitter
} = React;

const source1 = require('../ios/z.png');
const source2 = require('../ios/continue.png');
const source3 = require('../ios/exsiting_user.png');


const assets = {
      source1 : require('../ios/z.png'),
      source2 : require('../ios/continue.png'),
      source3 : require('../ios/exsiting_user.png'),
}


var LoginPage = React.createClass({

	getInitialState: function() {
	    return {
	      username: '',
	      password: '',
        needToRegister: true,
        //hidden: false,
        loginHide: false,
        registerHide: true,
        //source: require('../ios/z.png'),
        //source: require('image!newUserRegister'),
        source : source1,

        logoSlidePosition: new Animated.Value(80),
        userNameSlideUpPosition: new Animated.Value(400),
        passwordSlideUpPosition: new Animated.Value(500),
        fbLoginSlideUpPosition: new Animated.Value(600),
        forgetPasswordSlideUpPosition: new Animated.Value(700),
        firstVist: true,


        firstName: '',
        lastName:'',
        registerEmail:'',
        phoneNumber:'',


        firstNamePosition: new Animated.Value(800),
        lastNamePosition: new Animated.Value(800),
        registerEmailPosition: new Animated.Value(800),
        phoneNumberPosition: new Animated.Value(800),
        registerFBLoginPosition: new Animated.Value(800),
        agreementPosition: new Animated.Value(800),

        contentOffset: {x: 0, y: 0},
        //userNameFade: new Animated.Value(1),
        //passwordFade: new Animated.Value(1),
        //fbLoginFade: new Animated.Value(1),
        //forgetPasswordFadeIn: new Animated.Value(1)

    	}
  },
/*
  toggle: function() {
        this.setState({
            //hidden: !this.state.hidden
            loginHide: !this.state.loginHide,
            registerHide: !this.state.registerHide
        });
  },
*/


  onEmailTextChanged(event) {
    	this.setState({ username: event.nativeEvent.text });

      if(this.state.username === ''){
      this.setState({ needToRegister: true});
      this.setState({ source: source1});
      console.log('register');
    }else{
      this.setState({ needToRegister: false});
      this.setState({ source: source2});
      console.log('continue');
    }
  },

  onPasswordInput(event) {
    	this.setState({ password: event.nativeEvent.text });
  },

  onFirstNameChange(event) {
      this.setState({ firstName: event.nativeEvent.text });
  },

  onLastNameInput(event) {
      this.setState({ lastName: event.nativeEvent.text });
  },

  onRegisterEmailInput(event) {
      this.setState({ registerEmail: event.nativeEvent.text });
  },

  onPhoneNumberInput(event) {
      this.setState({ phoneNumber: event.nativeEvent.text });
  },

  componentDidMount: function(){
      Animated.timing(this.state.userNameSlideUpPosition, {
            toValue: 40, // 目标值
            duration: 300,
            easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.passwordSlideUpPosition, {
            toValue: 30, // 目标值
            duration: 300,
            delay: 50,
            easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.fbLoginSlideUpPosition, {
            toValue: 30, // 目标值
            duration: 300,
            delay: 50,
            easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.forgetPasswordSlideUpPosition, {
            toValue: 20, // 目标值
            duration: 300,
            delay: 60,
            easing: Easing.linear, // 动画时间
        }).start();
      

  },




  doRegister: function(){
    //this.toggle();
    //console.log("jump to register Scene");
    //this.setState({source:require('../ios/exsiting_user.png')});

    if (this.state.needToRegister == false){
        Actions.home();
        console.log('logging in');
    }else{

    if (this.state.firstVist === true){
        Animated.timing(this.state.userNameSlideUpPosition, {
                toValue: 500, // 目标值
                duration: 10,
                easing: Easing.linear, // 动画时间
            }).start();

        Animated.timing(this.state.passwordSlideUpPosition, {
                toValue: 400, // 目标值
                duration: 10,
                //delay: ,
                easing: Easing.linear, // 动画时间
            }).start();

        Animated.timing(this.state.fbLoginSlideUpPosition, {
                toValue: 400, // 目标值
                duration: 10,
                //delay: 50,
                easing: Easing.linear, // 动画时间
            }).start();
          
        Animated.timing(this.state.forgetPasswordSlideUpPosition, {
                toValue: 400, // 目标值
                duration: 10,
                //delay: 60,
                easing: Easing.linear, // 动画时间
        }).start();

        Animated.timing(this.state.logoSlidePosition, {
                toValue: 50, // 目标值
                duration: 300,
                //delay: 60,
                easing: Easing.linear, // 动画时间
        }).start();

        Animated.timing(this.state.registerFBLoginPosition, {
                toValue: -1800, // 目标值
                duration: 400,
                delay: 50,
                easing: Easing.linear, // 动画时间

        }).start();

        Animated.timing(this.state.firstNamePosition, {
                toValue: 10, // 目标值
                duration: 400,
                delay: 60,
                easing: Easing.linear, // 动画时间

        }).start();

        Animated.timing(this.state.lastNamePosition, {
                toValue: 28, // 目标值
                duration: 400,
                delay: 70,
                easing: Easing.linear, // 动画时间

        }).start();

        Animated.timing(this.state.registerEmailPosition, {
                toValue: 28, // 目标值
                duration: 400,
                delay: 80,
                easing: Easing.linear, // 动画时间

        }).start();

        Animated.timing(this.state.phoneNumberPosition, {
                toValue: 28, // 目标值
                duration: 400,
                delay: 90,
                easing: Easing.linear, // 动画时间

        }).start();

        Animated.timing(this.state.agreementPosition, {
                toValue: 25,
                duration: 400,
                delay: 100,
                easing: Easing.linear,

        }).start();

        this.setState({firstVist: !this.state.firstVist});
        this.setState({source: assets.source3});
    
    }else{

        Animated.timing(this.state.registerFBLoginPosition, {
                toValue: 500, // 目标值
                duration: 10,
                //delay: 50,
                easing: Easing.linear, // 动画时间

        }).start();

        Animated.timing(this.state.firstNamePosition, {
                toValue: 500, // 目标值
                duration: 10,
                //delay: 60,
                easing: Easing.linear, // 动画时间

        }).start();

        Animated.timing(this.state.lastNamePosition, {
                toValue: 500, // 目标值
                duration: 10,
                delay: 70,
                easing: Easing.linear, // 动画时间

        }).start();

        Animated.timing(this.state.registerEmailPosition, {
                toValue: 500, // 目标值
                duration: 10,
                //delay: 80,
                easing: Easing.linear, // 动画时间

        }).start();

        Animated.timing(this.state.phoneNumberPosition, {
                toValue: 500, // 目标值
                duration: 10,
                //delay: 90,
                easing: Easing.linear, // 动画时间

        }).start();

        Animated.timing(this.state.agreementPosition, {
                toValue: 500,
                duration: 10,
                //delay: 100,
                easing: Easing.linear,

        }).start();

        Animated.timing(this.state.userNameSlideUpPosition, {
                toValue: 40, // 目标值
                duration: 300,
                delay: 40,
                easing: Easing.linear, // 动画时间
            }).start();

        Animated.timing(this.state.passwordSlideUpPosition, {
                toValue: 30, // 目标值
                duration: 300,
                delay: 50,
                easing: Easing.linear, // 动画时间
            }).start();

        Animated.timing(this.state.fbLoginSlideUpPosition, {
                toValue: 30, // 目标值
                duration: 300,
                delay: 60,
                easing: Easing.linear, // 动画时间
            }).start();
          
        Animated.timing(this.state.forgetPasswordSlideUpPosition, {
                toValue: 20, // 目标值
                duration: 300,
                delay: 70,
                easing: Easing.linear, // 动画时间
        }).start();

        Animated.timing(this.state.logoSlidePosition, {
                toValue: 80, // 目标值
                duration: 300,
                //delay: 60,
                easing: Easing.linear, // 动画时间
        }).start();

        this.setState({firstVist: !this.state.firstVist});
        this.setState({source: source1});
        //console.log(this.state.source);
        console.log('source above');
      }
  }

  },


  textInputFocused(event){
    this.setState({
      contentOffset:{
        x: 0,
        y: 100,
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

	render: function() {

		return(
			<ScrollView style={styles.container} scrollEnabled={false} contentOffset = {this.state.contentOffset}>
				<Image style={styles.bg} source={require('../ios/BG.png')} />
				<TouchableOpacity style={styles.newUserRegister}
              			onPress={this.doRegister}>
              		<Image style={styles.accNewUser} source={this.state.source}/>
              		<Image style={styles.accNewUser} source={require('../ios/Line_new_user.png')}/>
        </TouchableOpacity>
          		<Animated.View style={[styles.logoContainer, {marginTop: this.state.logoSlidePosition}]}>
          			<Image source={require('../ios/logo.png')}/>
          		</Animated.View>
          		<Animated.View style={{marginTop: this.state.userNameSlideUpPosition}}>
          		    <Image style={styles.userNameBG} source={require('../ios/address.png')}/>
          			<Image style={styles.email} source={require('../ios/Email:.png')}/>
          			<TextInput 
                        style={styles.emailInput}
                        placeholder= "Input Email Here"
                        placeholderTextColor="grey"
                        value={this.state.username}
                        onChange={this.onEmailTextChanged}
                    />
          		</Animated.View>
          		<Animated.View style={{marginTop: this.state.passwordSlideUpPosition}}>
          		    <Image style={styles.userNameBG} source={require('../ios/address.png')}/>
          			<Image style={styles.email} source={require('../ios/Password:.png')}/>
          			<TextInput 
                        style={styles.passwordInput}
                        secureTextEntry={true}
                        placeholder= "Password"
                        placeholderTextColor="grey"
                        value={this.state.password}
                        onChange={this.onPasswordInput}
                    />
                    <Image style={styles.passwordWarningSign} source={require('../ios/Page1.png')}/>
          		</Animated.View>
          		<TouchableOpacity style={[styles.fbLogin, {marginTop: this.state.fbLoginSlideUpPosition}]}
              			onPress={this.FBlogin}>
              		<Image source={require('../ios/facebook.png')}/>
          		</TouchableOpacity>
          		<TouchableOpacity style={[styles.forgetPassword, {marginTop: this.state.forgetPasswordSlideUpPosition}]}
              			onPress={this.forgetPassword}>
              		<Image style={styles.accForgetPW} source={require('../ios/ForgotPassword.png')}/>
              		<Image style={styles.accForgetPW} source={require('../ios/Lineforgotpassword.png')}/>
          		</TouchableOpacity>



              <TouchableOpacity style={[styles.fbLoginRegister, {marginTop: this.state.registerFBLoginPosition}]}
                    onPress={this.FBlogin}>
                  <Image source={require('../ios/facebook.png')}/>
              </TouchableOpacity>
              <Animated.View style={{marginTop: this.state.firstNamePosition}}>
                  <Image style={styles.userNameBG} source={require('../ios/address.png')}/>
                <Image style={styles.email} source={require('../ios/first_name:.png')}/>
                <TextInput 
                        style={styles.firstNameInput}
                        placeholder= "firstname"
                        placeholderTextColor="grey"
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                        onFocus={this.textInputFocused}
                        onBlur={this.textInputBlur}
                    />
              </Animated.View>
              <Animated.View style={{marginTop: this.state.lastNamePosition}}>
                  <Image style={styles.userNameBG} source={require('../ios/address.png')}/>
                <Image style={styles.email} source={require('../ios/surname:.png')}/>
                <TextInput 
                        style={styles.lastNameInput}
                        placeholder= "surname"
                        placeholderTextColor="grey"
                        value={this.state.lastName}
                        onChange={this.onLastNameInput}
                        onFocus={this.textInputFocused}
                        onBlur={this.textInputBlur}
                    />
              </Animated.View>
              <Animated.View style={{marginTop: this.state.registerEmailPosition}}>
                  <Image style={styles.userNameBG} source={require('../ios/address.png')}/>
                <Image style={styles.email} source={require('../ios/Email:.png')}/>
                <TextInput 
                        style={styles.registerEmailInput}
                        placeholder= "email"
                        placeholderTextColor="grey"
                        value={this.state.registerEmail}
                        onChange={this.onRegisterEmailInput}
                        onFocus={this.textInputFocused}
                        onBlur={this.textInputBlur}
                    />
              </Animated.View>
              <Animated.View style={{marginTop: this.state.phoneNumberPosition}}>
                  <Image style={styles.userNameBG} source={require('../ios/address.png')}/>
                <Image style={styles.email} source={require('../ios/Phone_number:.png')}/>
                <TextInput 
                        style={styles.phoneNumberInput}
                        placeholder= "phone"
                        placeholderTextColor="grey"
                        value={this.state.phoneNumber}
                        onChange={this.onPhoneNumberInput}
                        onFocus={this.textInputFocused}
                        onBlur={this.textInputBlur}
                    />
              </Animated.View>
              <TouchableOpacity style={[styles.agreement, {marginTop: this.state.agreementPosition}]}
                    onPress={this.onRegister}>
                  <Image style={styles.accAgreemnt} source={require('../ios/words.png')}/>
              </TouchableOpacity>
      </ScrollView>



			)
	},
	
});


var styles = React.StyleSheet.create({
	container: {
      flexDirection: 'column',
      flex: 1,
      //backgroundColor: '#F58690',
    },

    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },

    newUserRegister:{
    	marginLeft: 260,
    	paddingTop: 35,
    },

    existingUser:{
      marginLeft: 250,
      paddingTop: 35,
    },

    accNewUser:{
    	marginTop:5,
      //resizeMode: 'contain',
      //alignItems: 'center',
      //justifyContent: 'center',
    },

    logoContainer:{
    	//marginTop: 80,
    	alignItems: 'center',
    },
    
    userNameContainter:{
    	marginTop: 40,
    },
    
    userNameBG:{
    	alignSelf:'center',
    },

    email:{
    	marginTop: -35,
    	marginLeft: 90,
    },

    passwordInput:{
    	position: 'absolute',
        left: 170,
        top: 17,
        right: 0,
        height: 20,
        fontSize: 14
    },

    emailInput:{
        position: 'absolute',
        left: 140,
        top: 17,
        right: 0,
        height: 20,
        fontSize: 14
    },

    firstNameInput:{
        position: 'absolute',
        left: 205,
        top: 17,
        right: 0,
        height: 20,
        fontSize: 14
    },

    lastNameInput:{
        position: 'absolute',
        left: 205,
        top: 17,
        right: 0,
        height: 20,
        fontSize: 14
    },

    registerEmailInput:{
        position: 'absolute',
        left: 205,
        top: 17,
        right: 0,
        height: 20,
        fontSize: 14
    },

    phoneNumberInput:{
        position: 'absolute',
        left: 205,
        top: 17,
        right: 0,
        height: 20,
        fontSize: 14
    },

    passwordWarningSign:{
    	position: 'absolute',
        top: 16,
        right: 86,
        height: 20,
        resizeMode: 'contain'
    },

    passwordContainter:{
    	marginTop: 30,
    },

    fbLogin:{
    	alignSelf:'center',
    },

    fbLogin2:{
      alignSelf:'center',
      marginTop: 30,
    },

    fbLoginRegister:{
      alignSelf:'center',
      //marginTop: 20,
    },

    forgetPassword:{
    	alignSelf:'center',
    },

    forgetPassword2:{
      alignSelf: 'center',
      marginTop: 20,
    },

    agreement:{
      alignSelf: 'center',
      //marginTop: 25,
    },

    accForgetPW:{
    	marginTop: 5,
    	alignSelf:'center',
    },

});

module.exports = LoginPage;