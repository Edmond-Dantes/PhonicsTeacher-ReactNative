/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import LetterView from './LetterView';

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');

function randomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNewRandomInt(min, max, previousRandomNumber){
  var randomNumber = randomInt(min, max)
  while (randomNumber == previousRandomNumber) {
    randomNumber = randomInt(min, max)
  }
  return randomNumber
}

export default class GameView extends Component {
  state;
  //props: {};
  constructor(props){
    super(props);
    this.state = {
      positionToShow: 0,
      previousRandomNumber: 0,
      previousRandomDelayDelta: 0,
      previousRandomDelay: 0,
      //shouldPositionHideArray: [false, false, false, false]
    };
  }

  randomLetterRevealUpdate(averageLetterDisplayTime:number){
      var randomNumber = getNewRandomInt(1, 4, this.state.previousRandomNumber)
      var randomDisplayDelta = getNewRandomInt(0, (averageLetterDisplayTime / 100), this.state.previousRandomDelayDelta) * 100 - averageLetterDisplayTime/2

      this.setState({
        positionToShow: randomNumber,
      });

      setTimeout( () => {
        this.setState({
          positionToShow: 0,
          previousRandomNumber: randomNumber,
          previousRandomDelayDelta: randomDisplayDelta
        });
      }, averageLetterDisplayTime + randomDisplayDelta);
  }

  startRandomLetterReveal(){
    var that = this;
    var averageLetterDisplayTime = 1000;
    var averageTimerInterval = 3000;

    this.randomLetterRevealUpdate(averageLetterDisplayTime);

    (function setTimeoutTimer(){
      var randomDelay = averageTimerInterval + 100 * getNewRandomInt(0, (averageTimerInterval / 400), that.state.previousRandomDelay) - averageLetterDisplayTime/4;
      setTimeout( ()=>{
        that.randomLetterRevealUpdate(averageLetterDisplayTime);
        that.setState({
          previousRandomDelay: randomDelay
        });
        setTimeoutTimer();
      }, randomDelay);
    })();


    /*
    setInterval( ()=>{
      this.randomLetterRevealUpdate(delay)
    }
    , delay);
    */
  }

  shouldShowPosition(position:number){
    return this.state.positionToShow == position
  }

  componentDidMount(){
    this.startRandomLetterReveal();
  }

  componentWillUnmount(){
    clearInterval()
  }

  render() {
    var letter = ['','A','B','C','D'];
    return (
      <View style={styles.container}>
        <View style = {styles.letterRow}>
          <LetterView
            position = 'topLeft'
            backgroundColor = 'royalblue'
            letter = {letter[1]}
            showLetter = {this.shouldShowPosition(1)}
          />
          <LetterView
            position = 'topRight'
            backgroundColor = 'goldenrod'
            letter = {letter[2]}
            showLetter = {this.shouldShowPosition(2)}
          />
        </View>
        <View style = {styles.letterRow}>
          <LetterView
            position = 'bottomLeft'
            backgroundColor = 'tomato'
            letter = {letter[3]}
            showLetter = {this.shouldShowPosition(3)}
          />
          <LetterView
            position = 'bottomRight'
            backgroundColor = 'seagreen'
            letter = {letter[4]}
            showLetter = {this.shouldShowPosition(4)}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "darkslategray",
    height: deviceWidth,
    width: deviceWidth,
  },
  letterRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});
