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
  LayoutAnimation,
} from 'react-native';

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');

var backgroundColorToMatchLetter = {
  'A':'tomato',
  'O':'seagreen',
  'U':'goldenrod',
  'default':'royalblue' //'royalblue','tomato','seagreen','goldenrod'
};

class Letter extends Component{
  /*
  constructor(props){
    super(props);
  }
  */
  render(){
    //this.props.letter = letter;
    let display = this.props.showLetter ? this.props.letter : '';
    //let {color:currentFontColor} = styles.letter;
    let fontColor = (this.props.letter /*== 'A'*/) ? StyleSheet.flatten(styles.letter).color : 'transparent';
    //console.log(fontColor)
    return (
      <Text style = {[styles.letter, {color: fontColor}]}> {display} </Text>
    );
  }
}


export default class LetterView extends Component {
  state;
  constructor(props){
    super(props);
    this.state = {
      w: StyleSheet.flatten(styles.letterView).width,
      h: StyleSheet.flatten(styles.letterView).height,
      isPressed: false,
    };
  }

  backgroundColorWhenHidden(){
    if (!this.props.showLetter){
      return this.props.letterBackgroundColor //'darkorange'//'darkslategray'//'beige'
    }
  }

  _onPress(){
    //this.setState({letter : this.props.letter});

    if (!this.state.isPressed){
      if (this.props.onPress()){
        setTimeout( () =>{
          LayoutAnimation.spring();
          this.setState({
            w: this.state.w - 15,
            h: this.state.h - 15,
            isPressed: false,
          })
        }, 100)
        LayoutAnimation.spring();
        this.setState({
          w: this.state.w + 15,
          h: this.state.h + 15,
          isPressed: true,
        })
      }else {
        setTimeout( () =>{
          LayoutAnimation.spring();
          this.setState({
            w: this.state.w + 10,
            h: this.state.h + 10,
            isPressed: false
          })
        }, 1000)
        LayoutAnimation.spring();
        this.setState({
          w: this.state.w - 10,
          h: this.state.h - 10,
          isPressed: true,
        })
      }
    }
  }

  _onOutPress(){

  }

  componentWillMount(){
    LayoutAnimation.spring();
  }
  render() {
    return (
      <TouchableWithoutFeedback onPressIn = {this._onPress.bind(this)}>
        <View style = {[styles.letterView, {width: this.state.w, height: this.state.h}, {backgroundColor: this.backgroundColorWhenHidden() || /*backgroundColorToMatchLetter[this.props.letter] ||*/ this.props.backgroundColor}]}>
          <Letter
            position = {this.props.position}
            showLetter = {this.props.showLetter}
            letter = {this.props.letter}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({

  letter: {
    fontSize: 100,
    color: 'ghostwhite',//'transparent'//'darkslategray'//'black'//"beige",
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  letterView: {
    justifyContent: 'center',
    backgroundColor: 'transparent',//backColor,
    alignItems: 'center',
    borderWidth: 1,//StyleSheet.hairlineWidth,
    borderRadius: 50,//deviceWidth/2,\
    borderColor: 'beige',
    height: deviceWidth/2 - 10,
    width: deviceWidth/2 - 10,
    //overflow: 'hidden',
  }
});

//AppRegistry.registerComponent('PhonicsTeacher', () => PhonicsTeacher);
