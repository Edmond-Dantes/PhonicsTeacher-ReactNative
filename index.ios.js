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
//import HUDView from "./Components/HUDView";

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');

export default class PhonicsTeacher extends Component {

  render() {
    return (
      //<View style = {styles.container}>
        <GameView letterBackgroundColor = {StyleSheet.flatten(styles.container).backgroundColor}/>
      //</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    backgroundColor: 'peru',//'burlywood',//'darkorange',//'darkslategray',//'#2f4f4f',
    height: deviceHeight,
    width: deviceWidth,
  },
});



AppRegistry.registerComponent('PhonicsTeacher', ()=> PhonicsTeacher);
