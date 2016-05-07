'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import {Actions, Scene, Router} from 'react-native-router-flux';

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  Easing
} = React;

var LoginPage = React.createClass({

	getInitialState: function() {
	    return {
	      username: '',
	      password: '',
        needToRegister: true,
        source: require('../ios/z.png'), 
        userNameSlideUpPosition: new Animated.Value(400),
        passwordSlideUpPosition: new Animated.Value(500),
        fbLoginSlideUpPosition: new Animated.Value(600),
        forgetPasswordSlideUpPosition: new Animated.Value(700),
        firstVist: true,

        userNameFadeIn: new Animated.Value(0),
        passwordFadeIn: new Animated.Value(0),
        fbLoginFadeIn: new Animated.Value(0),
        forgetPasswordFadeIn: new Animated.Value(0)
    	}
  },

  onEmailTextChanged(event) {
    	this.setState({ username: event.nativeEvent.text });

      if(this.state.username != ''){
      this.setState({ needToRegister: false});
      this.setState({ source: require('../ios/z.png')});
      console.log('continue');
    }else{
      this.setState({ needToRegister: true});
      this.setState({ source: require('../ios/continue.png')});
      console.log('register');
    }
  },

  onPasswordInput(event) {
    	this.setState({ password: event.nativeEvent.text });
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


      Animated.timing(this.state.userNameFadeIn, {
            toValue: 1, // 目标值
            duration: 300,
            delay: 20,
            easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.passwordFadeIn, {
            toValue: 1, // 目标值
            duration: 300,
            delay: 20,
            easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.fbLoginFadeIn, {
            toValue: 1, // 目标值
            duration: 300,
            delay: 20,
            easing: Easing.linear, // 动画时间
        }).start();

      Animated.timing(this.state.forgetPasswordFadeIn, {
            toValue: 1, // 目标值
            duration: 300,
            delay: 20,
            easing: Easing.linear, // 动画时间
        }).start();

  },

  doRegister: function(){
    this.setState({firstVist:false});
    Actions.register;
    console.log("jump to register Scene");
  },


	render: function() {

    if(this.state.firstVist === false) return this.renderSecondVisit();


		return(
			<View style={styles.container}>
				<Image style={styles.bg} source={require('../ios/BG.png')} />
				<TouchableOpacity style={styles.newUserRegister}
              			onPress={Actions.register}>
              		<Image style={styles.accNewUser} source={this.state.source}/>
              		<Image style={styles.accNewUser} source={require('../ios/Line_new_user.png')}/>
          		</TouchableOpacity>
          		<View style={styles.logoContainer}>
          			<Image source={require('../ios/logo.png')}/>
          		</View>
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
            </View>


			)
	},


  renderSecondVisit: function(){
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={require('../ios/BG.png')} />
        <TouchableOpacity style={styles.newUserRegister}
                    onPress={this.doRegister}>
                  <Image style={styles.accNewUser} source={this.state.source}/>
                  <Image style={styles.accNewUser} source={require('../ios/Line_new_user.png')}/>
              </TouchableOpacity>
              <View style={styles.logoContainer}>
                <Image source={require('../ios/logo.png')}/>
              </View>
              <Animated.View style={[styles.userNameContainter, {opacity: this.state.userNameFadeIn}]}>
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
              <Animated.View style={[styles.passwordContainter, {opacity: this.state.passwordFadeIn}]}>
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
              <TouchableOpacity style={[styles.fbLogin2, {opacity: this.state.fbLoginFadeIn}]}
                    onPress={this.FBlogin}>
                  <Image source={require('../ios/facebook.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.forgetPassword2, {opacity: this.state.forgetPasswordFadeIn}]}
                    onPress={this.forgetPassword}>
                  <Image style={styles.accForgetPW} source={require('../ios/ForgotPassword.png')}/>
                  <Image style={styles.accForgetPW} source={require('../ios/Lineforgotpassword.png')}/>
              </TouchableOpacity>
            </View>
      )
  }
	
});



var RegisterPage = React.createClass({
    getInitialState: function(){
      return{
          firstName: '',
          lastName:'',
          registerEmail:'',
          phoneNumber:'',
      }
    },

    render: function(){
      return{

      }
    }


});


var styles = React.StyleSheet.create({
	container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#F58690',
    },

    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },

    newUserRegister:{
    	marginLeft: 280,
    	paddingTop: 35,
    },

    accNewUser:{
    	marginTop:5,
      resizeMode: 'contain',
    },

    logoContainer:{
    	marginTop: 80,
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

    forgetPassword:{
    	alignSelf:'center',
    },

    forgetPassword2:{
      alignSelf: 'center',
      marginTop: 20,
    },

    accForgetPW:{
    	marginTop: 5,
    	alignSelf:'center',
    },

});

module.exports = LoginPage;