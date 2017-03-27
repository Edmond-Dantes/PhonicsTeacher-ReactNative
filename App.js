import React, { Component } from 'react';
  import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { TabNavigator, TabView } from 'react-navigation';

import GameView from "./Components/GameView";
import MainScreen from "./Navigation/MainScreen";
import StudyScreen from "./Navigation/StudyScreen";


export default class PhonicsTeacher extends Component {

  render() {
    return (
      <App/>
    );
  }
}


var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');


const styles = StyleSheet.create({
  card:{
    backgroundColor: 'yellow',
  },
  letterHeader: {
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
  },
  header: {
    backgroundColor: 'beige',
  },

});

const MainTabScreen = TabNavigator(
  {
    Tab1: { screen: MainScreen },
    Tab2: { screen: StudyScreen }
  },
  {
    //tabBarComponent: TabView.TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      style: {backgroundColor: 'beige'},
      labelStyle: [styles.letterHeader, {fontSize: 20}],
    }

  }
);


const App = StackNavigator({
  Main: { screen: MainTabScreen },
  Game: { screen: GameView },
},
  {
  initialRouteName: 'Main',
  //initialRouteParams: {letterArr: ['A','O','U']},
  navigationOptions: {
    header: {
      visible: false,
      style: styles.header,
      titleStyle: styles.letter,
      tintColor: 'tomato',
    },
  },
  mode: 'card',
  headerMode: 'screen',
  //cardStyle: styles.card,

},
);





AppRegistry.registerComponent('PhonicsTeacher', ()=> PhonicsTeacher);
