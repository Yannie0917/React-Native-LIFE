/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 我的页面
 *
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

export default class JYHomeArts extends Component {

  // 在render渲染之后，React会根据Virtual DOM来生成真实DOM，生成完毕后会调用该函数。
  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>歪果志</Text>
      </View>
    );
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
