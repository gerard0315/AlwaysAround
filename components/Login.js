'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
import {Actions} from 'react-native-router-flux';

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
  DeviceEventEmitter,
  StatusBar,
} = React;

var LoginPage = React.createClass({

	getInitialState: function() {
	  return {
	    username: '',
	    password: '',
      needToRegister: true,
      loginHide: false,
      registerHide: true,
      firstVist: true,
        
      topBarOpacity: new Animated.Value(0),
      logoSlidePosition: new Animated.Value(219),
      loginSlideUpPosition: new Animated.Value(400),
      loginSlideHorizontalPosition: new Animated.Value(0),
      orLineSlideUpPosition: new Animated.Value(11),

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
    Actions.home(); 
  },

  switchScene: function(){
    this.setState({needToRegister: !this.state.needToRegister});
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

      this.setState({
          username: '',
          password: '',
      });
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
                    <Text style = {styles.leftButton}>{(this.state.needToRegister) ?  "NEW USER":"EXISTING USER" }</Text>
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
          <View style = {styles.lineContainer}/>
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
      marginLeft: 19,
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
      alignSelf: 'center',
      justifyContent: 'center'
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