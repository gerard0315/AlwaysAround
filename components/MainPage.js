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



var MainPage = React.createClass({
	render() {
			console.log('MainPage');
			return <React.Text style={styles.text}>MainPage</React.Text>;
	}
	
});

module.exports = MainPage;