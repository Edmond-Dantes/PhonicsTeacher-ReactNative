/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');

class Blink extends Component {
state;
  constructor(props){
    super(props);
    this.state = {
      showText: true,
    };
  }
  /*
  startBlinking() {
    var speed = 1000;
    speed = 1000 * this.props.positionNumber;
    setInterval( () => {
      //speed = this.props.positionNumber;
      this.setState({
        showText: !this.state.showText,
      });
    }, speed);
  }
*/
  componentDidMount(){
    //this.startBlinking();
    //console.log(" This is it:" + this.props.positionNumber);
  }

  componentWillUnmount(){
    //clearInterval()
  }

  render() {
    //this.startBlinking();

    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text style = {styles.letter} > {display} </Text>
    );
  }
}

var letter = "A";

class Letter extends Component{
  //constructor(props){
  //  super(props);
  //}
  render(){
    switch (this.props.position){
      case 'topLeft':
      letter = 'A';
      break;
      case 'topRight':
      letter = 'B';
      break;
      case 'bottomLeft':
      letter = 'C';
      break;
      case 'bottomRight':
      letter = 'D';
      break;
      default:
      letter = 'A';
      break;
    }
    //this.props.letter = letter;
    let display = this.props.showLetter ? this.props.letter : ' ';
    return (
      <Text style = {styles.letter} > {display} </Text>
    );
  }
}


export default class LetterView extends Component {
  state;
  constructor(props){
    super(props);
    this.state = {
      displayLetter: 'o',
      //letter:'A'
    };
  }

  _onPress(){
    //this.setState({letter : this.props.letter});
    console.log("AAAAAAAAAAAH!" + this.props.letter);
  }


  render() {
    return (
      <TouchableOpacity onPress = {this._onPress.bind(this)}>
        <View style = {[styles.letterView, {backgroundColor: this.props.backgroundColor}]}>
          <Letter
            position = {this.props.position}
            showLetter = {this.props.showLetter}
            letter = {this.props.letter}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

  letter: {
    fontSize: 100,
    color: "beige",
    //fontFamily: "",
  },
  letterView: {
    justifyContent: 'center',
    //backgroundColor: backColor,
    alignItems: 'center',
    borderWidth: 20,
    borderRadius: 50,//deviceWidth/2,\
    borderColor: 'beige',
    height: deviceWidth/2 - 10,
    width: deviceWidth/2 - 10,
    //overflow: 'hidden',
  }
});

//AppRegistry.registerComponent('PhonicsTeacher', () => PhonicsTeacher);
