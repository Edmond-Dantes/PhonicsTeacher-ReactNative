import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

var {
  height:deviceHeight,
  width:deviceWidth
} = Dimensions.get('window');

export default class HUDView extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }



  render(){
    return (
      <View style = {styles.hudView}>
        <Text style = {styles.text}>
          A
        </Text>
        <Text style = {[styles.text, styles.math, styles.times]}>
          x
        </Text>
        <Text style = {[styles.text, styles.math, styles.count ]}>
          {this.props.scoreCount}
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  hudView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',//'flex-start',//'center',
    //backgroundColor: "transparent",//'#F5FCFF',
    height: (deviceHeight - deviceWidth) / 2,
    width: deviceWidth,
    top: 0,

  },
  text: {
    fontSize: (deviceHeight - deviceWidth) / 4,//100,
    color: 'ghostwhite',
    padding: 0,
    margin: deviceWidth / 25,//0,
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: {
      width: 0,
      height: 1,
    }
  },
  math: {
    color: 'gold',//'goldenrod',
    fontWeight: 'bold',
  },
  times: {
    fontSize: (deviceHeight - deviceWidth) / 12,
    textShadowRadius: 1,
  },
  count: {
    fontSize: (deviceHeight - deviceWidth) / 8,
  },
});
