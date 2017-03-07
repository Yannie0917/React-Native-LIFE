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
  Navigator,
  ListView,
  Platform
} from 'react-native';


// 导航条
import NavBar from '../Component/JYNavBar';

// 滚动切换组件
import ScrollableTabView,{ ScrollableTabBar } from 'react-native-scrollable-tab-view';
// 滚动切换组件的顶部tab
var CustomScrollTabBar = require('../Component/JYCustomeScrollTabBar');

// 首页--最新
var HomeNew = require('./JYHomeNew');
// 首页--热销榜
var HomeHot = require('./JYHomeHot');
// 首页--逛店
var HomeStroll = require('./JYHomeStroll');
// 首页--限时购
var HomeTimeLimit = require('./JYHomeTimelimit');
// 首页--精选
var HomeFeatured = require('./JYHomeFeatured');
// 首页--歪果志
var HomeArts = require('./JYHomeArts');
// 首页--问答
var HomeFAQs = require('./JYHomeFAQs');

// 自我
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

        <ScrollableTabView
          renderTabBar={() => <CustomScrollTabBar

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
            someProp={'here'} />}
            locked={Platform.OS === 'ios' ? false : true}
        >
          <HomeNew tabLabel="最新" />
          <HomeHot tabLabel="热销榜" />
          <HomeStroll tabLabel="逛店" />
          <HomeTimeLimit tabLabel="限时购" />
          <HomeFeatured tabLabel="精选" />
          <HomeArts tabLabel="歪果志" />
          <HomeFAQs tabLabel="问答" />
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
    // backgroundColor: '#F5FCFF',
  },
  navBarStyle: {
  }
});