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
  Animated,
  Easing,
} from 'react-native';
import Sound from 'react-native-sound';

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

var startCount = 0;

class AnimatedLetter extends Component{
  state;
  constructor(props){
    super(props);
    this.state = {
      position : new Animated.Value(0),//-deviceHeight * .25),
      _opacityAnimation : new Animated.Value(0)
    };
  }
  defaultProps = {
    onComplete: ()=>{},
    letter:'',
  }

  /*_opacityAnimation = this.state.position.interpolate({
      inputRange: [0, (-deviceHeight * .25)],
      outputRange: [1, 0]
    });
*/
  componentWillMount(){
    this.state._opacityAnimation = this.state.position.interpolate({
        inputRange: [(-deviceHeight * .25), (-deviceHeight / 8), 0],
        outputRange: [0, .75, .75]
      });
  }

  componentDidMount(){
    Animated.timing(
      this.state.position,
      {
        duration: 750,
        toValue: -deviceHeight * .25,
        //easing: Easing.out(Easing.ease),
      }
    ).start(this.props.onComplete);
  }


  render(){
    return (
      <View style = {[styles.animatedLetterView, {position:'absolute', borderWidth: 0,}]}>
        <Animated.Text style = {[{ alignSelf: 'center', color: 'white', fontSize: 150, backgroundColor: 'transparent',
          transform:[
            {translateY: this.state.position}
          ]}, {opacity: this.state._opacityAnimation}]}
        >
          {this.props.letter}
        </Animated.Text>
      </View>
    );
  }
}

class Letter extends Component{
  state;
  constructor(props){
    super(props);
    this.state = {
      //fontSize : 100,//StyleSheet.flatten(styles.letter).fontSize,
    };
  }

  render(){
    let display = '';//this.props.showLetter ? this.props.letter : '';
    let fontColor = (!this.props.letter /*== 'A'*/) ? 'transparent':StyleSheet.flatten(styles.letter).color;


    return (
      <View >
        <Animated.Text style = {[styles.letter, {color: fontColor, fontSize: this.props.fontSize }]}> {display} </Animated.Text>
      </View>
    );
  }
}


export default class LetterView extends Component {
  state;
  friction = 3;
  tension = 20;
  constructor(props){
    super(props);
    this.state = {
      w: new Animated.Value(standardWidth),
      h: standardHeight,
      isPressed: false,
      scored:false,
      wrongLetter:false,
      increaseFontSize: false,
      fontSize: new Animated.Value(100),
      floatingLetter: [],
      zIndex:0,
    };
  }

  componentWillMount(){

  }
  backgroundColorWhenHidden(){
    if (!this.props.showLetter){
      return this.props.letterBackgroundColor //'darkorange'//'darkslategray'//'beige'
    }
  }

  didScore(yes:bool = true){
    this.setState({
      scored:yes,
    });
  }

  didHitWrongLetter(yes:bool = true){
    this.setState({
      wrongLetter:yes,
    });
  }

  resetScoringFlags(inRender:bool){
    if (inRender){
      this.state.scored = false;
      this.state.wrongLetter = false;
      this.state.zIndex = 0;
    }
    else {
      this.setState({
        scored:false,
        wrongLetter:false,
        zIndex:0,
      });
    }

  }

  setPressed(pressed:bool){
    this.setState({
      isPressed: pressed,
    });
  }

  setZIndex(){
    this.setState({
      zIndex: 5,
    });
  }

  //Class Function _onPress: Several Animation functions start!
  springOutAnimation(toSize:number, callBack?:()=>{}){
    Animated.spring(
           this.state.w,
           {
             toValue: toSize,
             friction: this.friction,//5,
             tension: this.tension,//100,
           }
         ).start(callBack);
  }

  springInAnimation(toSize:number, callBack?:()=>{}){
    Animated.spring(
           this.state.w,
           {
             toValue: toSize,
             friction: this.friction,//5,
             tension: this.tension,//100,
           }
         ).start(callBack);
  }

  scoredAnimation(){
    const sizeDelta = 50; //percentage increase
    const toSize = standardWidth + standardWidth * sizeDelta/100;
    const returnSize = standardWidth;
    const pressAnimationTime = 1000;

    var that = this;
    setTimeout( () =>{
      that.props.startReveal();
      that.unscaleFontSize();
      that.springInAnimation(returnSize, this.setPressed(false));
    }, pressAnimationTime);
    this.props.stopReveal();
    this.scaleFontSize(150);
    this.setZIndex();
    this.springOutAnimation(toSize);
    this.setPressed(true);
    setTimeout( ()=>{
      this.addFloatingLetter();
    }, 250);
  }

  wrongLetterAnimation(){
    const sizeDelta = 30; //percentage decrease
    const toSize = standardWidth - standardWidth * sizeDelta/100;
    const returnSize = standardWidth;
    const pressAnimationTime = 100;
    var that = this;
    setTimeout( () =>{
      that.props.startReveal();
      that.scaleFontSize(100);
      that.springOutAnimation(returnSize, this.setPressed(false));
    }, pressAnimationTime)
    this.springInAnimation(toSize);
    this.props.stopReveal();
    this.unscaleFontSize(70)
    this.setPressed(true);
  }

  inactionPressAnimation(){
    const sizeDelta = 10; //percentage decrease
    const toSize = standardWidth - standardWidth * sizeDelta/100;
    const returnSize = standardWidth;
    const pressAnimationTime = 100;
    var that = this;
    setTimeout( () =>{
      that.springOutAnimation(returnSize);
      that.scaleFontSize(100);
    }, pressAnimationTime)
    this.springInAnimation(toSize);
    this.unscaleFontSize(90)
  }

  _onPress(){
    var pressedCorrectLetter = this.props.onPress()?true:false;

    if (this.props.showLetter){
      if (this.state.scored || this.state.wrongLetter){
        if (!this.state.isPressed){
        this.inactionPressAnimation();
        }
      }
      else if (pressedCorrectLetter){
        this.props.correctLetterSound.play();
        this.scoredAnimation();
        this.didScore(true);
      }
      else{
        this.props.wrongLetterSound.play();
        this.wrongLetterAnimation();
        this.didHitWrongLetter(true);
      }
    }else if (!this.props.showLetter){
      this.inactionPressAnimation();
      this.resetScoringFlags(false) //not in render so false
    }
    //Class Function _onPress: Several Animation functions end!

  }

  scaleFontSize(size:number = 150){
    Animated.spring(
           this.state.fontSize,
           {
             toValue: size,
             friction: this.friction,//5,
             tension: this.tension,//100,
           }
         ).start();
  }

  unscaleFontSize(size:number = 100){
    Animated.spring(
           this.state.fontSize,
           {
             toValue: size,
             friction: this.friction,//5,
             tension: this.tension,//100,
           }
         ).start();
  }

  _onOutPress(){}

  componentDidMount(){
  }

  addFloatingLetter(){
    startCount += 1;
    this.state.floatingLetter.push({
      id: startCount,
    });
    this.setState(this.state);
  }

  removeFloatingLetter(v:number){
    var index = this.state.floatingLetter.findIndex(function(letter) { return letter.id === v});
    this.state.floatingLetter.splice(index, 1);
    this.setState(this.state);
  }

  renderAnimatedLetter(){

    return (
      this.state.floatingLetter.map( function(v,i){
        return (
        <AnimatedLetter
          key = {v.id}
          letter = {this.props.letter}
          onComplete = {this.removeFloatingLetter.bind(this, v.id)}
        />
      )
      }, this)
    )
  }

  render() {

    if (!this.props.showLetter){
      this.resetScoringFlags(true); //in render so true
    }

    return (
      <View style = {{zIndex: this.state.zIndex}}>
      <TouchableWithoutFeedback onPressIn = {this._onPress.bind(this)}>
          <Animated.View style = {[styles.letterView, {width: this.state.w, height: this.state.w}, {backgroundColor: this.backgroundColorWhenHidden() || /*backgroundColorToMatchLetter[this.props.letter] ||*/ this.props.backgroundColor}]}>
            <Letter
              position = {this.props.position}
              showLetter = {this.props.showLetter}
              letter = {this.props.letter}
              fontSize = {this.state.fontSize}
              //increaseFontSize = {this.scaleFontSize.bind(this)}
            />
          </Animated.View>
      </TouchableWithoutFeedback>
      <View style = {{position:'absolute'}}>{this.renderAnimatedLetter()}</View>
    </View>
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
  },
  animatedLetterView: {
    justifyContent: 'center',
    backgroundColor: 'transparent',//backColor,
    alignItems: 'center',
    borderWidth: 10,//StyleSheet.hairlineWidth,
    borderRadius: 50,//deviceWidth/2,\
    borderColor: 'beige',
    height: (deviceWidth/2 - 10) * 1.5,
    width: (deviceWidth/2 - 10) * 1.5,
    //overflow: 'hidden',
  },
});

const standardWidth = StyleSheet.flatten(styles.letterView).width;
const standardHeight = StyleSheet.flatten(styles.letterView).height;


//AppRegistry.registerComponent('PhonicsTeacher', () => PhonicsTeacher);
