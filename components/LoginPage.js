'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';
import Toggle from 'react-native-toggle';

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView
} = React;

var LoginPage = React.createClass({

	getInitialState: function() {
	    return {
	      username: '',
	      password: '',
        needToRegister: true,
        //hidden: false,
        loginHide: false,
        registerHide: true,

        source: require('../ios/z.png'),

        userNameSlideUpPosition: new Animated.Value(400),
        passwordSlideUpPosition: new Animated.Value(500),
        fbLoginSlideUpPosition: new Animated.Value(600),
        forgetPasswordSlideUpPosition: new Animated.Value(700),
        firstVist: false,

        userNameFadeIn: new Animated.Value(0),
        passwordFadeIn: new Animated.Value(0),
        fbLoginFadeIn: new Animated.Value(0),
        forgetPasswordFadeIn: new Animated.Value(0)

    	}
  },

  toggle: function() {
        this.setState({
            //hidden: !this.state.hidden
            loginHide: !this.state.loginHide,
            registerHide: !this.state.registerHide
        });
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
    Actions.home;
    this.toggle();
    console.log("jump to register Scene");
  },
/*
  shouldComponentUpdate: function(nextState){
    return this.loginHide !== nextState.loginHide;

  },
*/
	render: function() {

    if(this.state.firstVist === false) return <RegisterPage/>;
    //if(this.state.hidden === true)

		return(
			<View style={styles.container}>
				<Image style={styles.bg} source={require('../ios/BG.png')} />
				<TouchableOpacity style={styles.newUserRegister}
              			onPress={Actions.home}>
              		<Image style={styles.accNewUser} source={this.state.source}/>
              		<Image style={styles.accNewUser} source={require('../ios/Line_new_user.png')}/>
          		</TouchableOpacity>
              <Toggle hidden={this.state.loginHide}>
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
          </Toggle>
      </View>



			)
	},

  /*
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

  */
	
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

    textInputFocused:function(mainView) {
          setTimeout(() => {
            let scrollResponder = this.refs.scrollView.getScrollResponder();
            scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
              React.findNodeHandle(this.refs[refName]),
              110, //additionalOffset
              true
            );
          }, 50);

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


    render: function(){
      return(
        <ScrollView style={styles.container} ref = 'mainView'>
        <Image style={styles.bg} source={require('../ios/BG.png')} />
        <TouchableOpacity style={styles.existingUser}
                    onPress={this.backToLogin}>
                  <Image style={styles.accNewUser} source={require('../ios/exsiting_user.png')}/>
                  <Image style={styles.accNewUser} source={require('../ios/Lineforgotpassword.png')}/>
              </TouchableOpacity>
              <View style={styles.registerLogoContainer}>
                <Image source={require('../ios/logo.png')}/>
              </View>
              <TouchableOpacity style={[styles.fbLoginRegister, {opacity: this.state.fbLoginFadeIn}]}
                    onPress={this.FBlogin}>
                  <Image source={require('../ios/facebook.png')}/>
              </TouchableOpacity>
              <Animated.View style={styles.firstNameContainer}>
                  <Image style={styles.userNameBG} source={require('../ios/address.png')}/>
                <Image style={styles.email} source={require('../ios/first_name:.png')}/>
                <TextInput 
                        style={styles.firstNameInput}
                        placeholder= "firstname"
                        placeholderTextColor="grey"
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                        onFocus={this.textInputFocused}
                    />
              </Animated.View>
              <Animated.View style={styles.lastNameContainer}>
                  <Image style={styles.userNameBG} source={require('../ios/address.png')}/>
                <Image style={styles.email} source={require('../ios/surname:.png')}/>
                <TextInput 
                        style={styles.lastNameInput}
                        placeholder= "surname"
                        placeholderTextColor="grey"
                        value={this.state.lastName}
                        onChange={this.onLastNameInput}
                        onFocus={this.textInputFocused}
                    />
              </Animated.View>
              <Animated.View style={styles.registerEmailContainter}>
                  <Image style={styles.userNameBG} source={require('../ios/address.png')}/>
                <Image style={styles.email} source={require('../ios/Email:.png')}/>
                <TextInput 
                        style={styles.registerEmailInput}
                        placeholder= "email"
                        placeholderTextColor="grey"
                        value={this.state.registerEmail}
                        onChange={this.onRegisterEmailInput}
                        onFocus={this.textInputFocused}
                    />
              </Animated.View>
              <Animated.View style={styles.phoneNumberContainer}>
                  <Image style={styles.userNameBG} source={require('../ios/address.png')}/>
                <Image style={styles.email} source={require('../ios/Phone_number:.png')}/>
                <TextInput 
                        style={styles.phoneNumberInput}
                        placeholder= "phone"
                        placeholderTextColor="grey"
                        value={this.state.phoneNumber}
                        onChange={this.onPhoneNumberInput}
                        onFocus={this.textInputFocused}
                    />
              </Animated.View>
              <TouchableOpacity style={styles.agreement}
                    onPress={this.agreement}>
                  <Image style={styles.accAgreemnt} source={require('../ios/words.png')}/>
              </TouchableOpacity>
            </ScrollView>
        )
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

    existingUser:{
      marginLeft: 250,
      paddingTop: 35,
    },

    registerLogoContainer:{
      marginTop: 50,
      alignItems: 'center',
    },

    firstNameContainer:{
      marginTop: 10,
    },

    lastNameContainer:{
      marginTop: 28,
    },

    registerEmailContainter:{
      marginTop: 28,
    },

    phoneNumberContainer:{
      marginTop: 28,
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
      marginTop: 20,
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
      marginTop: 25,
    },

    accForgetPW:{
    	marginTop: 5,
    	alignSelf:'center',
    },

});

module.exports = LoginPage;