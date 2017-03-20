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
import GameLogic from '../GameLogic/GameLogic';
import Sound from 'react-native-sound';

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

//var currentLetter = 'A';

export default class GameView extends Component {
  state;
  gameLogic:GameLogic;
  soundFiles = [];
  currentLetter = 'A';

  //props: {};
  constructor(props){
    super(props);
    this.gameLogic = new GameLogic();
    this.state = {
      activeScoreTouch: false,
      //shouldPositionHideArray: [false, false, false, false]
    };

    this.gameLogic.currentLetter = this.currentLetter

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

    if (!this.state.activeScoreTouch && this.gameLogic.currentLetter == displayLetter && this.shouldShowPosition(position)){
        this.setState({
          activeScoreTouch: true,
        });
        this.gameLogic.scoreCount = ++this.gameLogic.scoreCount
        this.updateRender();
      return previousCount + 1
    }
  }
  componentWillMount(){
    //this.loadSoundFiles();
  }
  componentDidMount(){
    //this.startRandomLetterReveal();
    this.gameLogic.startRandomLetterReveal(this.updateRender.bind(this), this.updateActiveScoreTouch.bind(this), );
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

  isTopRowZIndexPriority(){
    if (this.shouldShowPosition('topLeft') || this.shouldShowPosition('topRight')){
      return true;
    }
    return false;
  }

  render() {
    var testLetterArray = ['','A','B','C','D'];
    var letterArray = ['A','O','U'];
    var letterSoundsArray = ['aSound1.mp3', 'oSound1.mp3', 'uSound1.mp3'];

    const randomLetter = letterArray[this.gameLogic.randomLetterIndex];
    const letter = randomLetter;//'A' //randomLetter

    const correctDelayTime = 1000;
    const correctSoundIndex = this.gameLogic.randomCorrectSoundIndex
    var correctSound = this.gameLogic.correctLetterSoundFiles[correctSoundIndex]

    var topRowZIndex = this.isTopRowZIndexPriority()?1:0;
    var bottomRowZIndex = this.isTopRowZIndexPriority()?0:1;

    return (
      <View style = {styles.bigContainer}>
        <HUDView scoreCount = {this.gameLogic.scoreCount} currentLetter = {this.gameLogic.currentLetter}/>
        <View style = {styles.container}>
          <View style = {[styles.letterRow, {zIndex: topRowZIndex}]}>
            <LetterView
              correctLetterSound = {correctSound}
              wrongLetterSound = {this.gameLogic.wrongLetterSoundFiles[0]}
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
              correctLetterSound = {correctSound}
              wrongLetterSound = {this.gameLogic.wrongLetterSoundFiles[0]}
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
          <View style = {[styles.letterRow, {zIndex: bottomRowZIndex}]}>
            <LetterView
              correctLetterSound = {correctSound}
              wrongLetterSound = {this.gameLogic.wrongLetterSoundFiles[0]}
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
              correctLetterSound = {correctSound}
              wrongLetterSound = {this.gameLogic.wrongLetterSoundFiles[0]}
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
    backgroundColor: 'peru',
    height: deviceHeight,
    width: deviceWidth,
  },
  container: {
    flex: 0,
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
