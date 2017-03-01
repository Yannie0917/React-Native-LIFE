/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 首页
 *
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Navigator
} from 'react-native';


import Mine from './JYMine'

export default class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.textPress.bind(this)}
        >
          <View>
            <Text>我是首页</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  textPress() {
    const { navigator } = this.props;
    if(navigator) {
      navigator.push({
        name: 'Mine',
        component: Mine,
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});