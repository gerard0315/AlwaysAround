'use strict';

var React = require('react-native');


var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
});



var LoginPage = React.createClass({

	render() {
			console.log('LoginPage');
			return <React.Text style={styles.text}>LoginPage</React.Text>;
	}
	
});

module.exports = LoginPage;