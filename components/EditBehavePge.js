'use strict'
import React, {Component, PropTypes} from 'react';
import {Actions} from 'react-native-router-flux';
import {StyleSheet, MapView, Text, View, TouchableOpacity, Image, Navigator, ListView, TouchableHighlight, ScrollView, Modal, TabBarIOS, TextInput} from 'react-native';


export default class EditBehaviours extends Component{
    static propTypes = {
        data: React.PropTypes.object.isRequired,
        onNext: React.PropTypes.func,
    }; 

    constructor(props){
    	super(props);
    	this.state = {
        commands: this.props.data.commands,
    		isInSeason: this.props.data.is_in_season,
    		isChildFriendly: this.props.data.friendly_to_child,
    		pullsOnLead: this.props.data.pulls,
    		bark: this.props.data.barks,
    		digs: this.props.data.digs,
    		jumps: this.props.data.jumps_on_people,
    		isChipped: this.props.data.is_chipped,
    		hasIDTag: this.props.data.has_id_tag,

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
        this.setState({isInSeason: false});
        this.setState({sourceOne: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.isChildFriendly === true){
        this.setState({sourceTwo: require('../ios/check_green.png')});
      }else{
        this.setState({isChildFriendly: false});
        this.setState({sourceTwo: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.pullsOnLead === true){
        this.setState({sourceThree: require('../ios/check_green.png')});
      }else{
        this.setState({pullsOnLead: false});
        this.setState({sourceThree: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.bark === true){
        this.setState({sourceFour: require('../ios/check_green.png')});
      }else{
        this.setState({bark: false});
        this.setState({sourceFour: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.digs === true){
        this.setState({sourceFive: require('../ios/check_green.png')});
      }else{
        this.setState({digs: false});
        this.setState({sourceFive: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.jumps === true){
        this.setState({sourceSix: require('../ios/check_green.png')});
      }else{
        this.setState({jumps: false});
        this.setState({sourceSix: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.isChipped === true){
        this.setState({sourceSeven: require('../ios/check_green.png')});
      }else{
        this.setState({isChipped: false});
        this.setState({sourceSeven: require('../ios/BLANK_ICON.png')});
      }

      if (this.state.hasIDTag === true){
        this.setState({sourceEight: require('../ios/check_green.png')});
      }else{
        this.setState({hasIDTag: false});
        this.setState({sourceEight: require('../ios/BLANK_ICON.png')});
      }

    }

    onPressOne(event){
      if(this.state.isInSeason === true){
        this.setState({sourceOne: require('../ios/BLANK_ICON.png')});
        this.setState({isInSeason: false});
      }else{
        this.setState({sourceOne: require('../ios/check_green.png')});
        this.setState({isInSeason: true});
      }
    }

    onPressTwo(event){
      if(this.state.isChildFriendly === true){
        this.setState({sourceTwo: require('../ios/BLANK_ICON.png')});
        this.setState({isChildFriendly: false});
      }else{
        this.setState({sourceTwo: require('../ios/check_green.png')});
        this.setState({isChildFriendly: true});
      }
    }

    onPressThree(event){
      if(this.state.pullsOnLead === true){
        this.setState({sourceThree: require('../ios/BLANK_ICON.png')});
        this.setState({pullsOnLead: false});
      }else{
        this.setState({sourceThree: require('../ios/check_green.png')});
        this.setState({pullsOnLead: true});
      }
    }

    onPressFour(event){
      if(this.state.bark === true){
        this.setState({sourceFour: require('../ios/BLANK_ICON.png')});
        this.setState({bark: false});
      }else{
        this.setState({sourceFour: require('../ios/check_green.png')});
        this.setState({bark: true});
      }
    }

    onPressFive(event){
      if(this.state.digs === true){
        this.setState({sourceFive: require('../ios/BLANK_ICON.png')});
        this.setState({digs: false});
      }else{
        this.setState({sourceFive: require('../ios/check_green.png')});
        this.setState({digs: true});
      }
    }

    onPressSix(event){
      if(this.state.jumps === true){
        this.setState({sourceSix: require('../ios/BLANK_ICON.png')});
        this.setState({jumps: false});
      }else{
        this.setState({sourceSix: require('../ios/check_green.png')});
        this.setState({jumps: true});
      }
    }

    onPressSeven(event){
      if(this.state.isChipped === true){
        this.setState({sourceSeven: require('../ios/BLANK_ICON.png')});
        this.setState({isChipped: false});
      }else{
        this.setState({sourceSeven: require('../ios/check_green.png')});
        this.setState({isChipped: true});
      }
    }

    onPressEight(event){
      if(this.state.hasIDTag === true){
        this.setState({sourceEight: require('../ios/BLANK_ICON.png')});
        this.setState({hasIDTag: false});
      }else{
        this.setState({sourceEight: require('../ios/check_green.png')});
        this.setState({hasIDTag: true});
      }
    }

    onChangeCommands(event){
      this.setState({commands: event.nativeEvent.text});
    }

    onPressSave(){
      var label = 2;
      var behaviours = {
        commands: this.state.commands,
        "is_in_season": this.state.isInSeason,
        "friendly_to_child": this.state.isChildFriendly,
        "pulls": this.state.pullsOnLead,
        "digs": this.state.digs,
        "barks": this.state.barks,
        "jumps_on_people": this.state.jumps,
        "is_chipped": this.state.isChipped,
        "has_id_tag": this.state.hasIDTag      
      }
      this.props.onNext(label, behaviours);
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

          	<TouchableOpacity style= {styles.checkBoxCol}
              onPress = {this.onPressOne.bind(this)}
              activeOpacity = {1}>
            	<Text style = {styles.infoText}>Is in season</Text>
              	<View style = {styles.checkBoxStyle}>
                	<View style = {styles.checkBox}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceOne}/>
                	</View>
            	</View>
          	</TouchableOpacity>

          	<TouchableOpacity style= {styles.checkBoxCol}
              onPress = {this.onPressTwo.bind(this)}
              activeOpacity = {1}>
            	<Text style = {styles.infoText}>Is child-friendly</Text>
              	<View style = {styles.checkBoxStyle}>
                	<View style = {styles.checkBox}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceTwo}/>
                	</View>
            	</View>
          	</TouchableOpacity>

          	<TouchableOpacity style= {styles.checkBoxCol}
              onPress = {this.onPressThree.bind(this)}
              activeOpacity = {1}>
            	<Text style = {styles.infoText}>Pulls on the lead</Text>
              	<View style = {styles.checkBoxStyle}>
                	<View style = {styles.checkBox}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceThree}/>
                	</View>
            	</View>
          	</TouchableOpacity>

          	<TouchableOpacity style= {styles.checkBoxCol}
              onPress = {this.onPressFour.bind(this)}
              activeOpacity = {1}>
            	<Text style = {styles.infoText}>Barks</Text>
              	<View style = {styles.checkBoxStyle}>
                	<View style = {styles.checkBox}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceFour}/>
                	</View>
            	</View>
          	</TouchableOpacity>

          	<TouchableOpacity style= {styles.checkBoxCol}
              onPress = {this.onPressFive.bind(this)}
              activeOpacity = {1}>
            	<Text style = {styles.infoText}>Digs</Text>
              	<View style = {styles.checkBoxStyle}>
                	<View style = {styles.checkBox}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceFive}/>
                	</View>
            	</View>
          	</TouchableOpacity>

          	<TouchableOpacity style= {styles.checkBoxCol}
              onPress = {this.onPressSix.bind(this)}
              activeOpacity = {1}>
            	<Text style = {styles.infoText}>Jumps on people</Text>
              	<View style = {styles.checkBoxStyle}>
                	<View style = {styles.checkBox}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceSix}/>
                	</View>
            	</View>
          	</TouchableOpacity>

          	<TouchableOpacity style= {styles.checkBoxCol}
              onPress = {this.onPressSeven.bind(this)}
              activeOpacity = {1}>
            	<Text style = {styles.infoText}>Is micro-chipped</Text>
              	<View style = {styles.checkBoxStyle}>
                	<View style = {styles.checkBox}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceSeven}/>
                	</View>
            	</View>
          	</TouchableOpacity>

          	<TouchableOpacity style= {styles.checkBoxCol}
              onPress = {this.onPressEight.bind(this)}
              activeOpacity = {1}>
            	<Text style = {styles.infoText}>Has ID Tags</Text>
              	<View style = {styles.checkBoxStyle}>
                	<View style = {styles.checkBox}>            
                  	<Image style = {styles.checkImage}
                      	source = {this.state.sourceEight}/>
                	</View>
            	</View>
          	</TouchableOpacity>
          	<View style = {{marginTop: 10, marginLeft: 19, height: 1, width: 375, backgroundColor: 'white'}}/>
	        <TouchableOpacity style = {styles.buttonSave}
	          activeOpacity = {0.8}
            onPress = {this.onPressSave.bind(this)}
            >
	          <Image source = {require('../ios/next.png')}/>
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
    borderColor: '#62C6C6',
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