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
  View,
  Platform
} from 'react-native';

// 导航条
import NavBar from '../Component/JYNavBar';
// 滚动切换组件
import ScrollableTabView,{ DefaultTabBar } from 'react-native-scrollable-tab-view';
// 搜索-栏目
var SearchSpecial = require('./JYSearchSpecial');
var SearchSingleItem = require('./JYSearchSingleItem');

export default class Home extends Component {

  render() {
    return (
      <View style={styles.container}>

        <NavBar
          title="L I F E"
        />

        <ScrollableTabView
          renderTabBar={()=><DefaultTabBar
            style={{
              height:40,
              borderWidth:0
            }}

            underlineColor='#ce3d3a'
            activeTextColor='#393939'
            inactiveTextColor='#393939'
            underlineHeight={0}
            underlineStyle={{
              height: 2,
              backgroundColor: '#fdd23c',
              bottom: 1
            }}
            textStyle={{ fontSize: 14, bottom:4 }}
            backgroundColor='#fff'
            tabStyle={{paddingBottom: 0, paddingLeft:18,paddingRight:18}}
            someProp={'here'}
          />}
          locked={Platform.OS === 'ios' ? false : true}
        >
          <SearchSpecial tabLabel="栏目" />
          <SearchSingleItem tabLabel="单品" />
        </ScrollableTabView>

      </View>
    );
  }


  leftPress() {
    alert("左边")
  }

  rightPress() {
    alert("右边")
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});