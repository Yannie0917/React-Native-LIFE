/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 首页 - 歪果志
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

var JYHomeArts = React.createClass({

  getDefaultProps() {
    return {
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>歪果志</Text>
      </View>
    );
  },

})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

module.exports = JYHomeArts;