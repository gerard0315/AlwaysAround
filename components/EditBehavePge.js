'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS, TextInput} from 'react-native';


export default class EditBehaviours extends Component{
    static propTypes = {
        data: React.PropTypes.object.isRequired,
    }; 

    constructor(props){
    	super(props);
    	this.state = {
        commands: this.props.data.Commands,
    		isInSeason: this.props.data.InSeason,
    		isChildFriendly: this.props.data.Child_friendly,
    		pullsOnLead: this.props.data.Pulls,
    		bark: this.props.data.Barks,
    		digs: this.props.data.Digs,
    		jumps: this.props.data.Jumps,
    		isChipped: this.props.data.Chipped,
    		hasIDTag: this.props.data.IDtag,

    		sourceOne: null,
    		sourceTwo: null,
    		sourceThree: null,
    		sourceFour: null,
    		sourceFive: null,
    		sourceSix: null,
    		sourceSeven: null,
    		sourceEight: null,
    	}
    }

    componentWillMount(){
      if (this.state.isInSeason === true){
        this.setState({sourceOne: require('../ios/check_green.png')});
      }else{
        this.setState({sourceOne: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.isChildFriendly === true){
        this.setState({sourceTwo: require('../ios/check_green.png')});
      }else{
        this.setState({sourceTwo: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.pullsOnLead === true){
        this.setState({sourceThree: require('../ios/check_green.png')});
      }else{
        this.setState({sourceThree: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.bark === true){
        this.setState({sourceFour: require('../ios/check_green.png')});
      }else{
        this.setState({sourceFour: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.digs === true){
        this.setState({sourceFive: require('../ios/check_green.png')});
      }else{
        this.setState({sourceFive: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.jumps === true){
        this.setState({sourceSix: require('../ios/check_green.png')});
      }else{
        this.setState({sourceSix: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.isChipped === true){
        this.setState({sourceSeven: require('../ios/check_green.png')});
      }else{
        this.setState({sourceSeven: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.hasIDTag === true){
        this.setState({sourceEight: require('../ios/check_green.png')});
      }else{
        this.setState({sourceEight: require('../ios/BLANK_ICON.png')});
      }

    }

    onPressOne(event){
		this.setState({ isInSeason: !this.state.isInSeason});
      	this.setState({ sourceOne: (this.state.isInSeason) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
    }

    onPressTwo(event){
		this.setState({ isChildFriendly: !this.state.isChildFriendly});
      	this.setState({ sourceTwo: (this.state.isChildFriendly) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
    }

    onPressThree(event){
		this.setState({ pullsOnLead: !this.state.pullsOnLead});
      	this.setState({ sourceThree: (this.state.pullsOnLead) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
    }

    onPressFour(event){
		this.setState({ bark: !this.state.bark});
      	this.setState({ sourceFour: (this.state.bark) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
    }

    onPressFive(event){
		this.setState({ digs: !this.state.digs});
      	this.setState({ sourceFive: (this.state.digs) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
    }

    onPressSix(event){
		this.setState({ jumps: !this.state.jumps});
      	this.setState({ sourceSix: (this.state.jumps) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
    }

    onPressSeven(event){
		this.setState({ isChipped: !this.state.isChipped});
      	this.setState({ sourceSeven: (this.state.isChipped) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
    }

    onPressEight(event){
		this.setState({ hasIDTag: !this.state.hasIDTag});
      	this.setState({ sourceEight: (this.state.hasIDTag) ? require('../ios/check_green.png'): require('../ios/BLANK_ICON.png')});
    }

    onChangeCommands(event){
      this.setState({commands: event.nativeEvent.text});
    }

    render(){
    	return(
    	<View style = {styles.container}>
        	<View style = {styles.shadow}/>
        	<Image style = {styles.bg} source = {require('../ios/BG.png')}/>
        	<Text style = {[styles.sectionTitle, {marginTop: 30}]}>Routines & Behaviours</Text>
        	<View style = {[styles.infoInputContainer, {marginTop: 20}]}>
            	<TextInput style = {styles.infoInput}
              		placeholder = {"Commands the dog responds to"}
              		placeholderColor= {'#B6B6B6'}
                  value = {this.state.commands}
                  onChange = {this.onChangeCommands.bind(this)}/>
        	</View>
        	<Text style = {[styles.sectionTitle, {marginTop: 20}]}>The Dog</Text>
        	<View style = {{marginTop: 10, marginLeft: 19, height: 1, width: 375, backgroundColor: 'white'}}/>
          	<View style= {styles.checkBoxCol}>
            	<Text style = {styles.infoText}>Is in season</Text>
              	<View style = {styles.checkBoxStyle}>
                	<TouchableOpacity 
                  		style = {styles.checkBox}
                  		onPress = {this.onPressOne.bind(this)}
                  		activeOpacity = {1}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceOne}/>
                	</TouchableOpacity>
            	</View>
          	</View>
          	<View style= {styles.checkBoxCol}>
            	<Text style = {styles.infoText}>Is child-friendly</Text>
              	<View style = {styles.checkBoxStyle}>
                	<TouchableOpacity 
                  		style = {styles.checkBox}
                  		onPress = {this.onPressTwo.bind(this)}
                  		activeOpacity = {1}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceTwo}/>
                	</TouchableOpacity>
            	</View>
          	</View>
          	<View style= {styles.checkBoxCol}>
            	<Text style = {styles.infoText}>Pulls on the lead</Text>
              	<View style = {styles.checkBoxStyle}>
                	<TouchableOpacity 
                  		style = {styles.checkBox}
                  		onPress = {this.onPressThree.bind(this)}
                  		activeOpacity = {1}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceThree}/>
                	</TouchableOpacity>
            	</View>
          	</View>
          	<View style= {styles.checkBoxCol}>
            	<Text style = {styles.infoText}>Barks</Text>
              	<View style = {styles.checkBoxStyle}>
                	<TouchableOpacity 
                  		style = {styles.checkBox}
                  		onPress = {this.onPressFour.bind(this)}
                  		activeOpacity = {1}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceFour}/>
                	</TouchableOpacity>
            	</View>
          	</View>
          	<View style= {styles.checkBoxCol}>
            	<Text style = {styles.infoText}>Digs</Text>
              	<View style = {styles.checkBoxStyle}>
                	<TouchableOpacity 
                  		style = {styles.checkBox}
                  		onPress = {this.onPressFive.bind(this)}
                  		activeOpacity = {1}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceFive}/>
                	</TouchableOpacity>
            	</View>
          	</View>
          	<View style= {styles.checkBoxCol}>
            	<Text style = {styles.infoText}>Jumps on people</Text>
              	<View style = {styles.checkBoxStyle}>
                	<TouchableOpacity 
                  		style = {styles.checkBox}
                  		onPress = {this.onPressSix.bind(this)}
                  		activeOpacity = {1}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceSix}/>
                	</TouchableOpacity>
            	</View>
          	</View>
          	<View style= {styles.checkBoxCol}>
            	<Text style = {styles.infoText}>Is micro-chipped</Text>
              	<View style = {styles.checkBoxStyle}>
                	<TouchableOpacity 
                  		style = {styles.checkBox}
                  		onPress = {this.onPressSeven.bind(this)}
                  		activeOpacity = {1}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceSeven}/>
                	</TouchableOpacity>
            	</View>
          	</View>
          	<View style= {styles.checkBoxCol}>
            	<Text style = {styles.infoText}>Has ID Tags</Text>
              	<View style = {styles.checkBoxStyle}>
                	<TouchableOpacity 
                  		style = {styles.checkBox}
                  		onPress = {this.onPressEight.bind(this)}
                  		activeOpacity = {1}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceEight}/>
                	</TouchableOpacity>
            	</View>
          	</View>
          	<View style = {{marginTop: 10, marginLeft: 19, height: 1, width: 375, backgroundColor: 'white'}}/>
	        <TouchableOpacity style = {styles.buttonSave}
	          activeOpacity = {0.8}>
	          <Image source = {require('../ios/save.png')}/>
	        </TouchableOpacity>
        </View>
    )
    }

}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 23, 
    marginLeft: 0, 
    width: 375,
    height: 573,
    backgroundColor: 'white'
  },

  shadow:{
    position: 'absolute',
    left: 0,
    top: 0,
    height: 0.6,
    right:0,
    backgroundColor: 'black',
    opacity: 0.5
  },

  bg:{
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    //resizeMode: 'stretch'
  },

  sectionTitle:{
  	marginLeft: 19,
  	fontSize: 18,
  	fontFamily: 'SanFranciscoDisplay-Medium',
  	color: '#FFC927',
  	backgroundColor: 'transparent'
  },

  infoInputContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#B6B6B6',
    width: 337,
    height: 36,
    marginLeft: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2  
  },

  infoInput: {
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Medium',
    color: '#727272',
    marginLeft: 10,
    height: 20,
    width: 150,
    borderRadius: 2,
    //backgroundColor: 'red'
  },

  checkBoxCol:{
    flexDirection: 'row',
    height: 20,
    marginLeft: 19,
    marginTop:10,
    width: 337,
    justifyContent:'space-between'
    //backgroundColor: '#E15667',
  },

  checkBox:{
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B6B6B6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  checkImage:{
    height: 19,
    width: 19,
    borderRadius: 9.5,
    resizeMode: 'cover'
    //marginBottom: 10,
  },

  checkBoxStyle:{
    flex: 1,
    alignItems: 'flex-end',
  },

  infoText:{
    fontSize: 16,
    fontFamily: 'SanFranciscoDisplay-Medium',
    color: 'white',
    backgroundColor: 'transparent'
  },
  
  buttonSave:{
    position: 'absolute',
    left: 19,
    right: 19,
    bottom: 10,
  }


  });