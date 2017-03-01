/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 搜索页面
 *
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
} from 'react-native';

export default class Search extends Component {

  render() {
    return (
      <Text>搜索页面</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});