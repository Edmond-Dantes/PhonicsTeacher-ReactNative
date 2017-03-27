'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
//import Sound from 'react-native-sound';
//import LetterView from './LetterView';
//import HUDView from "./HUDView";

//var Sound = require('react-native-sound');
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

export default class GameLogic{

  randomCorrectSoundIndex:number;
  previousCorrectSoundIndex:number;
  positionToShow: number;
  previousRandomNumber: number;
  previousRandomDelayDelta: number;
  previousRandomDelay: number;
  previousRandomLetterIndex: number;
  randomLetterIndex: number;
  scoreCount: number;
  randomLetterRevealStartTimer;
  letterRevealTimer;
  //that = this;
  soundFiles = [];
  correctLetterSoundFiles = [];
  wrongLetterSoundFiles = [];
  currentStudySound:Sound;
  currentLetter = '';
  that = this;
  letterArray = ['A','O','U'];
  constructor(){
    this.positionToShow = 0;
    this.previousRandomNumber = 0;
    this.previousRandomDelayDelta = 0;
    this.previousRandomDelay = 0;
    this.previousRandomLetterIndex = 6;
    this.randomLetterIndex = 0;
    this.randomCorrectSoundIndex = 0;
    this.previousCorrectSoundIndex = 0;
    this.scoreCount = 0;


    this.loadSoundFiles();

  }

  loadCorrectSound(){
    //load wrong letter sound
    var correctLetterSound = ['NiceJob.mp3','Wonderful.mp3','Yep.mp3'];
    for (var i =0; i < correctLetterSound.length; i++){
      var correctSound = new Sound(correctLetterSound[i], Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
      // loaded successfully
      console.log('duration in seconds: ' + correctSound.getDuration() + 'number of channels: ' + correctSound.getNumberOfChannels());
      });
      this.correctLetterSoundFiles.push(correctSound);
    }
  }

  loadWrongSound(){
    //load wrong letter sound
    var wrongLetterSound = ['mistakeSound.mp3']
    var wrongSound = new Sound(wrongLetterSound[0], Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    // loaded successfully
    console.log('duration in seconds: ' + wrongSound.getDuration() + 'number of channels: ' + wrongSound.getNumberOfChannels());
    });
    this.wrongLetterSoundFiles.push(wrongSound);
  }

  loadSoundFiles(){
    this.loadCorrectSound();
    this.loadWrongSound();

    //load letter sounds

    var aSounds = ['aSound1.mp3','aSound2.mp3','aSound3.mp3'];
    var oSounds = ['oSound1.mp3','oSound2.mp3','oSound3.mp3'];
    var uSounds = ['uSound1.mp3','uSound2.mp3','uSound3.mp3'];

    var sounds = [aSounds, oSounds, uSounds];
    for (var i =0; i < sounds.length; i++){
      var tempArray = [];
      for (var j =0; j < sounds[i].length; j++){
        var newSound = new Sound(sounds[i][j], Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
        // loaded successfully
        console.log('duration in seconds: ' + newSound.getDuration() + 'number of channels: ' + newSound.getNumberOfChannels());
        });
        tempArray.push(newSound);
      }
      this.soundFiles.push(tempArray);
    }
  }

  /*getCorrectLetterSound(){
    return  this.correctLetterSoundFiles[this.randomCorrectSoundIndex];
  }*/

  randomLetterRevealUpdate(averageLetterDisplayTime:number, renderUpdate = ()=>{}, activeScoreTouchUpdate = ()=>{}){
      var randomNumber = getNewRandomInt(1, 4, this.previousRandomNumber)
      var randomDisplayDelta = getNewRandomInt(0, (averageLetterDisplayTime / 100), this.previousRandomDelayDelta) * 100 - averageLetterDisplayTime/2

      this.positionToShow = randomNumber;
      this.previousRandomNumber = randomNumber;
      this.previousRandomDelayDelta = randomDisplayDelta;
      this.previousRandomLetterIndex = this.randomLetterIndex;
      renderUpdate();

      this.letterRevealTimer = setTimeout( () => {
        //console.log(randomNumber +' ')
        this.positionToShow = 0;
        //this.previousRandomNumber = randomNumber;
        //this.previousRandomDelayDelta = randomDisplayDelta;
        //this.previousRandomLetterIndex = this.randomLetterIndex;
        renderUpdate();
        activeScoreTouchUpdate();
      }, averageLetterDisplayTime + randomDisplayDelta);
  }

  startRandomLetterReveal(renderUpdate, activeScoreTouchUpdate, willRestart:bool = false, revealReliefTime:number){
    var that = this;
    var averageLetterDisplayTime = 1000; //range = 50% to 150%
    var averageTimerInterval = 2000; //range = 75% to 125%
    if (willRestart){
      setTimeout(()=>{
        this.positionToShow = 0;
        activeScoreTouchUpdate();
        renderUpdate();
        call();
      }, revealReliefTime);
      //this.positionToShow = 0;
      this.previousRandomLetterIndex = this.randomLetterIndex;
      this.previousRandomNumber = this.positionToShow

    }else{
      call();
    }
    function call(){

      (function setTimeoutTimer(){
        var randomDelay = averageTimerInterval + (averageTimerInterval / 8) * getNewRandomInt(0, 4, that.previousRandomDelay) - averageLetterDisplayTime/4;
        that.randomLetterRevealStartTimer = setTimeout( ()=>{
          that.randomLetterIndex = getNewRandomInt(0, 2, that.previousRandomLetterIndex);
          //var randomLetterIndex = that.randomLetterIndex;
          if (that.letterArray[that.randomLetterIndex] === that.currentLetter){
            that.randomCorrectSoundIndex = getNewRandomInt(0, that.correctLetterSoundFiles.length - 1, that.previousCorrectSoundIndex);
            that.previousCorrectSoundIndex = that.randomCorrectSoundIndex;
          }

          that.randomLetterRevealUpdate(averageLetterDisplayTime, renderUpdate, activeScoreTouchUpdate);
          that.previousRandomDelay = randomDelay;
          that.playLetterSound(that.randomLetterIndex);
          renderUpdate();
          setTimeoutTimer();
        }, randomDelay);
      })();
    }
  }

  stopRandomLetterReveal(){
    //var that = this;
    //this.stopSounds();
    clearTimeout(this.letterRevealTimer);
    clearTimeout(this.randomLetterRevealStartTimer);
    //clearInterval();
  }

  getThis(){
    var that = this;
    return that
  }

  /*stopSounds(){
    for (var i =0; i < soundFiles.length; i++){
      this.soundFiles[i].stop();
    }
  }
  */
  playStudyLetterSound(letter, reset?:bool){
    if (this.currentStudySound && reset){
      this.currentStudySound.stop();
    }
    var soundConvert = {'A':0, 'O':1, 'U':2};
    var soundIndex = soundConvert[letter];
    var randomSoundVersion = randomInt(0, this.soundFiles[soundIndex].length - 1);
    //play the sound
    this.soundFiles[soundIndex][randomSoundVersion].play();
    this.currentStudySound = this.soundFiles[soundIndex][randomSoundVersion];
  }

  playLetterSound(soundIndex){
    var randomSoundVersion = randomInt(0, this.soundFiles[soundIndex].length - 1);
    //play the sound
    this.soundFiles[soundIndex][randomSoundVersion].play();

/*
    this.soundFiles[soundIndex].play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
*/

  }

}
