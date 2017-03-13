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
import HUDView from './HUDView';
import GameLogic from '../GameLogic/GameLogic'

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

//object to enumerate values for the letter view positions
var letterViewPositions = {
  'topLeft':1,
  'topRight':2,
  'bottomLeft':3,
  'bottomRight':4,
}

var currentLetter = 'A'

export default class GameView extends Component {
  state;
  gameLogic:GameLogic;

  //props: {};
  constructor(props){
    super(props);
    this.gameLogic = new GameLogic();
    this.state = {
      activeScoreTouch: false,
      //shouldPositionHideArray: [false, false, false, false]
    };
  }

  shouldShowPosition(position:string){
    switch (position) {
      case 'topLeft': case 'topRight': case 'bottomLeft': case 'bottomRight':
        return this.gameLogic.positionToShow == letterViewPositions[position] //object
      default:
        console.log('error: '+position+' is not a positon name! Check the spelling!')
        return false
    }
    //return this.state.positionToShow == letterViewPositions[position] //object
  }

  updateCount(displayLetter:string, position:string, previousCount:number){//count:number){

    if (!this.state.activeScoreTouch && currentLetter == displayLetter && this.shouldShowPosition(position)){
        this.setState({
          activeScoreTouch: true,
        });
        this.gameLogic.scoreCount = ++this.gameLogic.scoreCount
        this.updateRender();
      return previousCount + 1
    }
  }

  componentDidMount(){
    //this.startRandomLetterReveal();
    this.gameLogic.startRandomLetterReveal(this.updateRender.bind(this), this.updateActiveScoreTouch.bind(this));
  }

  componentWillUnmount(){
    //clearInterval()
    this.gameLogic.stopRandomLetterReveal()
    //this.gameLogic = null//new GameLogic();
  }

  updateRender(){
    //console.log(this.state.scoreCount);
    (this.setState({
      //scoreCount: this.state.scoreCount + 1,
    }));
  }

  updateActiveScoreTouch(){
    this.setState({
      activeScoreTouch: false,
    });
  }

  render() {
    var testLetterArray = ['','A','B','C','D'];
    var letterArray = ['A','O','U'];
    //this.gameLogic.randomLetterIndex = getNewRandomInt(0, 2, this.gameLogic.previousRandomLetterIndex);
    const randomLetter = letterArray[this.gameLogic.randomLetterIndex];
    const letter = randomLetter;//'A' //randomLetter
    const correctDelayTime = 1000;
    //console.log(this.gameLogic.randomLetterIndex +' ')

    return (
      <View style = {styles.bigContainer}>
        <HUDView scoreCount = {this.gameLogic.scoreCount}/>
        <View style = {styles.container}>
          <View style = {styles.letterRow}>
            <LetterView
              //test = {this.scaleFontSize}
              onPress = {this.updateCount.bind(this, letter, 'topLeft', this.gameLogic.scoreCount)}
              position = 'topLeft'
              backgroundColor = {'royalblue'}
              letter = {letter}
              showLetter = {this.shouldShowPosition('topLeft')}
              letterBackgroundColor = {this.props.letterBackgroundColor}
              stopReveal = {this.gameLogic.stopRandomLetterReveal.bind(this.gameLogic.that)}
              startReveal = {this.gameLogic.startRandomLetterReveal.bind(this.gameLogic.that, this.updateRender.bind(this), this.updateActiveScoreTouch.bind(this), true, correctDelayTime)}
            />
            <LetterView
              //test = {this.scaleFontSize}
              onPress = {this.updateCount.bind(this, letter, 'topRight', this.gameLogic.scoreCount)}
              position = 'topRight'
              backgroundColor = 'goldenrod'
              letter = {letter}
              showLetter = {this.shouldShowPosition('topRight')}
              letterBackgroundColor = {this.props.letterBackgroundColor}
              stopReveal = {this.gameLogic.stopRandomLetterReveal.bind(this.gameLogic.that)}
              startReveal = {this.gameLogic.startRandomLetterReveal.bind(this.gameLogic.that, this.updateRender.bind(this), this.updateActiveScoreTouch.bind(this), true, correctDelayTime)}
            />
          </View>
          <View style = {styles.letterRow}>
            <LetterView
              //test = {this.scaleFontSize}
              onPress = {this.updateCount.bind(this, letter, 'bottomLeft', this.gameLogic.scoreCount)}
              position = 'bottomLeft'
              backgroundColor = 'tomato'
              letter = {letter}
              showLetter = {this.shouldShowPosition('bottomLeft')}
              letterBackgroundColor = {this.props.letterBackgroundColor}
              stopReveal = {this.gameLogic.stopRandomLetterReveal.bind(this.gameLogic.that)}
              startReveal = {this.gameLogic.startRandomLetterReveal.bind(this.gameLogic.that, this.updateRender.bind(this), this.updateActiveScoreTouch.bind(this), true, correctDelayTime)}
            />
            <LetterView
              //test = {this.scaleFontSize}
              onPress = {this.updateCount.bind(this, letter, 'bottomRight', this.gameLogic.scoreCount)}
              position = 'bottomRight'
              backgroundColor = 'seagreen'
              letter = {letter}
              showLetter = {this.shouldShowPosition('bottomRight')}
              letterBackgroundColor = {this.props.letterBackgroundColor}
              stopReveal = {this.gameLogic.stopRandomLetterReveal.bind(this.gameLogic.that)}
              startReveal = {this.gameLogic.startRandomLetterReveal.bind(this.gameLogic.that, this.updateRender.bind(this), this.updateActiveScoreTouch.bind(this), true, correctDelayTime)}
            />
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  bigContainer: {
    flex: 0,
    flexDirection: 'column',
    backgroundColor: 'peru',//'burlywood',//'darkorange',//'darkslategray',//'#2f4f4f',
    height: deviceHeight,
    width: deviceWidth,
  },
  container: {
    flex: 0,
    //backgroundColor: 'darkslategray',
    height: deviceWidth,
    width: deviceWidth,
    alignSelf: 'center',
    position: 'absolute',
    top: deviceHeight / 2 - deviceWidth / 2,
  },
  letterRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});
