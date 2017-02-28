'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
//import LetterView from './LetterView';
//import HUDView from "./HUDView";

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

export default class GameLogic{
  positionToShow: number;
  previousRandomNumber: number;
  previousRandomDelayDelta: number;
  previousRandomDelay: number;
  previousRandomLetterIndex: number;
  randomLetterIndex: number;
  scoreCount: number;
  constructor(){
    this.positionToShow = 0;
    this.previousRandomNumber = 0;
    this.previousRandomDelayDelta = 0;
    this.previousRandomDelay = 0;
    this.previousRandomLetterIndex = 6;
    this.randomLetterIndex = 0;
    this.scoreCount = 0;
  }

  randomLetterRevealUpdate(averageLetterDisplayTime:number, renderUpdate = ()=>{}, activeScoreTouchUpdate = ()=>{}){
      var randomNumber = getNewRandomInt(1, 4, this.previousRandomNumber)
      var randomDisplayDelta = getNewRandomInt(0, (averageLetterDisplayTime / 100), this.previousRandomDelayDelta) * 100 - averageLetterDisplayTime/2

      this.positionToShow = randomNumber;

      setTimeout( () => {
        //console.log(randomNumber +' ')
        this.positionToShow = 0;
        this.previousRandomNumber = randomNumber;
        this.previousRandomDelayDelta = randomDisplayDelta;
        this.previousRandomLetterIndex = this.randomLetterIndex;
        renderUpdate();
        activeScoreTouchUpdate();
      }, averageLetterDisplayTime + randomDisplayDelta);
  }

  startRandomLetterReveal(renderUpdate, activeScoreTouchUpdate){
    var that = this;
    var averageLetterDisplayTime = 1000; //range = 50% to 150%
    var averageTimerInterval = 2000; //range = 75% to 125%

    that.randomLetterRevealUpdate(averageLetterDisplayTime, renderUpdate, activeScoreTouchUpdate);

    (function setTimeoutTimer(){
      var randomDelay = averageTimerInterval + (averageTimerInterval / 8) * getNewRandomInt(0, 4, that.previousRandomDelay) - averageLetterDisplayTime/4;
      setTimeout( ()=>{
        that.randomLetterIndex = getNewRandomInt(0, 2, that.previousRandomLetterIndex);
        that.randomLetterRevealUpdate(averageLetterDisplayTime, renderUpdate, activeScoreTouchUpdate);
        that.previousRandomDelay = randomDelay;
        renderUpdate();
        setTimeoutTimer();
      }, randomDelay);
    })();
  }

  stopRandomLetterReveal(){
    clearInterval()
  }

}
