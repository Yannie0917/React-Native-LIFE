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

import NavBar from '../Component/JYNavBar'
import Mine from './JYMine';

export default class Home extends Component {

  render() {
    return (
      <View style={styles.container}>

        <NavBar
          title="L I F E"
          leftIcon="ios-calendar-outline"
          leftPress={this.leftPress.bind(this)}
          rightIcon="ios-search-outline"
          rightPress={this.rightPress.bind(this)}
        />

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

  leftPress() {
    alert("左边")
  }

  rightPress() {
    alert("右边")
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
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navBarStyle: {


  }
});