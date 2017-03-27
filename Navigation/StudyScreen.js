import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
  Image,
} from 'react-native';
//import { TabNavigator } from 'react-navigation';
import GameLogic from '../GameLogic/GameLogic';
import Sound from 'react-native-sound';

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');



export default class StudyScreen extends Component {
  gameLogic:GameLogic;

  constructor(props) {
    super(props);
    this.gameLogic = new GameLogic();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'A', 'O', 'U'
      ])
    };
  }


  static navigationOptions = {
      /*title: 'Main Menu',
      header: {
        visible: true,
      },
      */
      tabBar: {
        visible: true,
        label: 'Study',
      }
    };
  render() {
    const { navigate } = this.props.navigation;
    var swipeRightText = '>>>';
    //console.log(this.props.navigation.state.key);
    //var letterArr = this.props.navigation.state.params.letterArr;
    return (
      <View style = {styles.container}>
        <ListView contentContainerStyle = {styles.listViewStyle}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <View style = {styles.letterRow}>
              <Text
                style = {styles.letter}
                onPress = {this.gameLogic.playStudyLetterSound.bind(this.gameLogic.that,rowData,true)}
                >
                  {rowData}
              </Text>
          <Image
            style = {{width: 40, height: 35}}
            source = {require('../img/soundIcon.png')}/>
        </View>)}
        />
        <Text style = {styles.swipe}> {swipeRightText} </Text>
      </View>


    );
  }
}




const styles = StyleSheet.create({
  listViewStyle:{
    width: deviceWidth,
  },
  container:{
    justifyContent: 'center',
    backgroundColor: 'beige',//'green',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    height: deviceHeight,
    width: deviceWidth,
    paddingTop: deviceHeight / 2 - deviceWidth * .75,
  },
  letter: {
    alignSelf: 'center',
    fontSize: 100,
    color: 'seagreen',//'ghostwhite',//'transparent'//'darkslategray'//'black'//"beige",
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    //width: deviceWidth,
    backgroundColor: 'transparent',
    margin: 10,
  },
  letterRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',//'space-around',
  },
  swipe: {
    paddingLeft: 20,
    alignSelf: 'flex-start',
    fontSize: 50,
    color: 'darkslategray',//'ghostwhite',//'transparent'//'darkslategray'//'black'//"beige",
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    //width: deviceWidth,
    backgroundColor: 'transparent',
  },

});
