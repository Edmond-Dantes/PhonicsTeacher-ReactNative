/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import GameView from "./Components/GameView";
//import LetterView from "./Components/Letter";

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');

export default class PhonicsTeacher extends Component {

  render() {
    return (
      <View style = {styles.container}>
        <GameView/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black",//'#F5FCFF',
    height: deviceHeight,//ScreenSize.getDeviceDimensions().height,
    width: deviceWidth,//ScreenSize.getDeviceDimensions().width,
  },
  letter: {
    fontSize: 100,
    textAlign: 'center',
    margin: 10,
    color: "red",
    //font:
  },
});



AppRegistry.registerComponent('PhonicsTeacher', ()=> PhonicsTeacher);
