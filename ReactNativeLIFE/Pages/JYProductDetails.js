/**
 * Created by Sunshine on 2017/3/14.
 * 商品详情
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

export default class JYProductDetails extends Component {
  render() {
    return (

      <View style={styles.container}>
        <Text>
          商品详情页
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