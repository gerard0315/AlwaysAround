'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} = React;

var LoginPage = React.createClass({

	getInitialState: function() {
	    return {
	      username: '',
	      password: '',
    	}
  	},

  	onEmailTextChanged(event) {
    	this.setState({ username: event.nativeEvent.text });
  	},

  	onPasswordInput(event) {
    	this.setState({ password: event.nativeEvent.text });
  	},

	render: function() {
		return(
			<View style={styles.container}>
				<Image style={styles.bg} source={require('../ios/BG.png')} />
				<TouchableOpacity style={styles.newUserRegister}
              			onPress={this.doRegister}>
              		<Image style={styles.accNewUser} source={require('../ios/z.png')}/>
              		<Image style={styles.accNewUser} source={require('../ios/Line_new_user.png')}/>
          		</TouchableOpacity>
          		<View style={styles.logoContainer}>
          			<Image source={require('../ios/logo.png')}/>
          		</View>
          		<View style={styles.userNameContainter}>
          		    <Image style={styles.userNameBG} source={require('../ios/address.png')}/>
          			<Image style={styles.email} source={require('../ios/Email:.png')}/>
          			<TextInput 
                        style={styles.emailInput}
                        placeholder= "Input Email Here"
                        placeholderTextColor="grey"
                        value={this.state.username}
                        onChange={this.onEmailTextChanged}
                    />
          		</View>
          		<View style={styles.passwordContainter}>
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
          		</View>
          		<TouchableOpacity style={styles.fbLogin}
              			onPress={this.FBlogin}>
              		<Image source={require('../ios/facebook.png')}/>
          		</TouchableOpacity>
          		<TouchableOpacity style={styles.forgetPassword}
              			onPress={this.forgetPassword}>
              		<Image style={styles.accForgetPW} source={require('../ios/ForgotPassword.png')}/>
              		<Image style={styles.accForgetPW} source={require('../ios/Lineforgotpassword.png')}/>
          		</TouchableOpacity>
            </View>


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

    accNewUser:{
    	marginTop:5,
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
    	marginTop: 30,
    	alignSelf:'center',
    },

    forgetPassword:{
    	marginTop: 20,
    	alignSelf:'center',
    },

    accForgetPW:{
    	marginTop: 5,
    	alignSelf:'center',
    },

});

module.exports = LoginPage;