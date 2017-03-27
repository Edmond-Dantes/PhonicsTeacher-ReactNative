import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
} from 'react-native';
//import { TabNavigator } from 'react-navigation';

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');



export default class MainScreen extends Component {
  constructor(props) {
    super(props);
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
        label: 'Play',
      }
    };
  render() {
    const { navigate } = this.props.navigation;
    var swipeLeftText = '<<<';
    //console.log(this.props.navigation.state.key);
    //var letterArr = this.props.navigation.state.params.letterArr;
    return (
      <View style = {styles.container}>
        <ListView contentContainerStyle = {styles.listViewStyle}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text
            style = {styles.letter}
            onPress = {() => navigate('Game', {letter:rowData})}
            >
            {rowData}
          </Text>}
        />
        <Text style = {styles.swipe}> {swipeLeftText} </Text>
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
    color: 'tomato',//'ghostwhite',//'transparent'//'darkslategray'//'black'//"beige",
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
  swipe: {
    paddingRight: 20,
    alignSelf: 'flex-end',
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
