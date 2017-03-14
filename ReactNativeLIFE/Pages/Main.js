/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 入口
 *
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
} from 'react-native';


var tabBarHeight = 46;

import TabNavigator from 'react-native-tab-navigator';

import Home from './JYHome'
import Search from './JYSearch'
import Mine from  './JYMine'

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab : 'Home'
    };
  }

  render() {
    return (
      <TabNavigator
        hidesTabTouch={true}
        tabBarStyle={styles.tabBarStyle}
        // 这里是调整底部间隙,避免底部的tabBar挡住上面的视图
        sceneStyle={{paddingBottom: tabBarHeight}}
      >

        {/*首页*/}
        <TabNavigator.Item
          selected={this.state.selectedTab === 'Home'}
          title=" "
          // 由于不显示文字这里将高度设置为0
          titleStyle={{height: 0}}
          renderIcon={() => <Image source={require('../Images/TabBar/icon_home.png')} style={{width: 25, height: 25, paddingTop: 5}} />}
          renderSelectedIcon={() => <Image source={require('../Images/TabBar/icon_home_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'Home' })}>
          {
            <Home {...this.props}/>
          }
        </TabNavigator.Item>

        {/*搜索*/}
        <TabNavigator.Item
          selected={this.state.selectedTab === 'Search'}
          title=" "
          // 由于不显示文字这里将高度设置为0
          titleStyle={{height: 0}}
          renderIcon={() => <Image source={require('../Images/TabBar/icon_discovery.png')} />}
          renderSelectedIcon={() => <Image source={require('../Images/TabBar/icon_discovery_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'Search' })}>
          {
            <Search {...this.props}/>
          }
        </TabNavigator.Item>

        {/*自我*/}
        <TabNavigator.Item
          selected={this.state.selectedTab === 'Mine'}
          title=" "
          // 由于不显示文字这里将高度设置为0
          titleStyle={{height: 0}}
          renderIcon={() => <Image source={require('../Images/TabBar/icon_personal.png')} />}
          renderSelectedIcon={() => <Image source={require('../Images/TabBar/icon_personal_selected.png')} />}
          onPress={() => this.setState({ selectedTab: 'Mine' })}>
          {
            <Mine {...this.props}/>
          }
        </TabNavigator.Item>
      </TabNavigator>
    );
  }

}


const styles = StyleSheet.create({
  tabBarStyle: {
    height: tabBarHeight,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});