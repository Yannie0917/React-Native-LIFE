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
  ScrollView
} from 'react-native';

export default class Mine extends Component {
  render() {
    return (

    <View style={styles.container}>
      <Text>
        自我页面
      </Text>
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
