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
        sceneStyle={{ paddingBottom: 0 }}
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
            <Navigator
              style={{flex:1}}
              initialRoute={{
                name: 'Home',
                component: Home
              }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.PushFromRight;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }}
            />
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
            <Navigator
              style={{flex:1}}
              initialRoute={{
                name: 'Search',
                component: Search
              }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.PushFromRight;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }}
            />
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
            <Navigator
              style={{flex:1}}
              initialRoute={{
                name: 'Mine',
                component: Mine
              }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.PushFromRight;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }}
            />
          }
        </TabNavigator.Item>
      </TabNavigator>
    );
  }

}


const styles = StyleSheet.create({
  tabBarStyle: {
    height: 46,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});